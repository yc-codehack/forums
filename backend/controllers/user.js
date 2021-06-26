import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import UserProfile from "../models/profile.js";

import sendEmail from "./utils/sendEmail.js";
import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");

export const signin = async (req, res) => {
	const { email, password } = req.body;

	// async block
	try {
		// finding user detail in db
		var existingUser = await User.findOne({ email });

		// user does not exist
		if (!existingUser) {
			return res.status(404).json({ message: "User does not exist." });
		}

		// comparing the password
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		// password incorrect
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		//password correct
		// creating token
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test", // REVIEW move the secret text to env file
			{ expiresIn: "7d" } // REVIEW change the token expire time
		);

		const imageUrl = await UserProfile.findOne({
			accountId: existingUser._id,
		});

		const userData = {
			email: existingUser.email,
			name: existingUser.name,
			_id: existingUser._id,
			imageUrl: imageUrl
				? imageUrl.image
					? imageUrl.image
					: null
				: null,
		};

		return res.status(200).json({ result: userData, token });
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const signup = async (req, res) => {
	try {
		const { email, password, firstName, lastName } = req.body;
		// finding user detail in db
		const existingUser = await User.findOne({ email });

		// user exists can't re-register
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// hashing the password
		const hashedPassword = await bcrypt.hash(password, 12);

		// creating user
		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});
		// creates the detail of user in profile schema
		await UserProfile.create({
			name: `${firstName} ${lastName}`,
			accountId: result._id,
			createdAt: new Date().toISOString(),
		});

		// creating token
		const token = jwt.sign(
			{ email: result.email, id: result._id },
			"test", // REVIEW move the secret text to env file
			{ expiresIn: "7d" } // REVIEW change the token expire time
		);

		const imageUrl = await UserProfile.findOne({
			accountId: result._id,
		});

		const userData = {
			email: result.email,
			name: result.name,
			_id: result._id,
			imageUrl: imageUrl
				? imageUrl.image
					? imageUrl.image
					: null
				: null,
		};

		// send email
		try {
			const verificationToken = jwt.sign(
				{ email: result.email, id: result._id },
				"test",
				{ expiresIn: "1hr" }
			);
			const url = `http://localhost:3000/verify/${verificationToken}`;
			const html = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Account Verification</title>
			</head>
			<style>
				* {
					margin: 0;
					padding: 0;
				}
				
				body {
					background-color: whitesmoke;
					font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;
				}
				
				.verify-box {
					padding: 0px;
					margin-left: 25%;
					margin-right: 25%;
					margin-top: 2%;
					border: 0px solid;
					border-radius: 5px;
					width: 50%;
					max-width: 684px;
					background-color: white;
				}
				
				.verify-img>img{
					width: 684px;
					height: 180px;
				}
			
				.verify-heading>h1 {
					color: black;
					text-align: center;
					font-size: 38px;
					padding-top: 4%;
					font-weight: lighter;
				}
				
				.verify-description {
					text-align: center;
					line-height: 1.7;
					word-break: break-word;
					/* font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; */
					font-size: 16px;
					color: black;
					padding-top: 2%;
					font-weight: lighter;
				}
				
				button {
					padding: 20px;
					width: 150px;
					text-transform: uppercase;
					font-weight: 700;
					background-color: orange;
					text-decoration: none;
					cursor: pointer;
					color: white;
					border: 0px;
					margin-bottom: 20px;
				}
				@media screen and (max-width: 840px){
					.verify-box{
						margin-top: 45px;
						margin-left: 20%;
						margin-right: 20%;
						width: 60%;
						max-width: 60%;
					}
					.verify-img>img{
						width: 100%;
						max-width: 250px;
						height: 80px;
					}
					.verify-heading>h1{
						font-size: 20px;
					}
					.verify-description{
						font-size: 12px;
					}
					.verify-btn>button{
						width: 140px;
						height: 25px;
						font-size: 09px;
						text-align:center;
						padding: 08px;
					}
				}
			</style>
			
			<body>
				<div class="verify-box">
					<div class="verify-img">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdsAAAB9CAYAAADqSMlzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADJmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkMwMEU2OEI5Rjk4MTFFOEJEM0M5RDU4Q0JBRDc3QjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkMwMEU2OEM5Rjk4MTFFOEJEM0M5RDU4Q0JBRDc3QjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQzAwRTY4OTlGOTgxMUU4QkQzQzlENThDQkFENzdCMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQzAwRTY4QTlGOTgxMUU4QkQzQzlENThDQkFENzdCMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRG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"><br><br>
					</div>
					<div class="verify-heading">
						<h1>Email Confirmation</h1><br>
						<div class="verify-description"> Hey, youre almost ready to start enjoying our site Simply click the <br>big yellow button below to verify your <br> email address.
							<br><br>
							<div class="verify-btn">
								<button >
								<a href=${url}> 
								
								Verify email address
								</a>
								</button>
							</div>
						</div>
					</div>
				</div>
				<br>
			</body>
			
			</html>
			`;
			sendEmail(result.email, "Testing", html);
			// console.log("mail sent");
		} catch (error) {
			console.log(error);
		}

		return res.status("200").json({ result: result, token });
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const verify = async (req, res) => {
	console.log("user controller", req.body);
	try {
		const { token } = req.body;

		const decodedData = jwt.verify(token, "test");
		const userId = decodedData?.id;

		await User.updateOne({ _id: userId }, { $set: { idVerified: true } });

		const existingUser = await UserProfile.findOne({ accountId: userId });

		const userInfo = await User.findOne({ _id: userId });

		const userData = {
			email: userInfo.email,
			name: existingUser.name,
			_id: existingUser._id,
			imageUrl: existingUser.image ? existingUser.image : null,
		};

		const authToken = jwt.sign(
			{ email: userInfo.email, id: existingUser._id },
			"test", // REVIEW move the secret text to env file
			{ expiresIn: "7d" } // REVIEW change the token expire time
		);

		return res.status(200).json({ result: userData, token: authToken });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		// finding user detail in db
		const existingUser = await User.findOne({ email });

		// user exists can't re-register
		if (!existingUser) {
			return res.status(400).json({ message: "User does not exists" });
		}
		// send email
		try {
			const verificationToken = jwt.sign(
				{ email: result.email, id: result._id },
				"test",
				{ expiresIn: "10m" }
			);
			const url = `http://localhost:3000/resetPassword/${verificationToken}`;
			

		

	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};
