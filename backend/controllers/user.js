import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
	const { email, password } = req.body;

	// async block
	try {
		// finding user detail in db
		const existingUser = await User.findOne({ email });

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
			"test", // REVIEW move the secrect text to env file
			{ expiresIn: "1hr" } // REVIEW change the token expire time
		);

		return res.status(200).json({ result: existingUser, token });
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

		// hasing the password
		const hashedPassword = await bcrypt.hash(password, 12);

		// creating user
		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		// creating token
		const token = jwt.sign(
			{ email: result.email, id: result._id },
			"test", // REVIEW move the secrect text to env file
			{ expiresIn: "1hr" } // REVIEW change the token expire time
		);

		return res.status("200").json({ result: result, token });
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong" });
	}
};
