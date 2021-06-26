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
	const { email, password, firstName, lastName } = req.body;

	try {
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
			// let transporter = nodemailer.createTransport({
			// 	host: "smtp.gmail.com",
			// 	port: 465,
			// 	secure: true,
			// 	auth: {
			// 		user: "photographylensoflight@gmail.com",
			// 		pass: "jldzirlyikvpvqsw",
			// 		// user: "jeweljservices@gmail.com",
			// 		// pass: "oekrxgyaxzbsizmb",
			// 	},
			// });

			// let info = transporter.sendMail({
			// 	from: "jeweljservices@gmail.com",
			// 	to: "satijex491@jq600.com",
			// 	subject: "test",
			// 	text: "text",
			// });
			sendEmail(result.email, "Testing", "Hello");
			// console.log("mail sent");
		} catch (error) {
			console.log(error);
		}

		return res.status("200").json({ result: result, token });
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong" });
	}
};
