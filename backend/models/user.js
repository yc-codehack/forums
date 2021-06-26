import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	id: { type: String },
	isVerified: {
		type: Boolean,
		default: false,
	},
	admin: {
		type: Boolean,
		default: false,
	},
});

export default mongoose.model("User", userSchema);
