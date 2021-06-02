import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
	name: String,
	image: String,
	accountId: String,
	status: {
		type: Boolean,
		default: false,
	},
	questionCount: {
		type: Number,
		default: 0,
	},
	answerCount: {
		type: Number,
		default: 0,
	},
	score: {
		type: Number,
		default: 0,
	},
	likedQuestion: [String],
	dislikedQuestion: [String],
	likedAnswer: [String],
	dislikedAnswer: [String],
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const UserProfile = mongoose.model("UserProfile", profileSchema);

export default UserProfile;
