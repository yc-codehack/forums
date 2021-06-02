import mongoose from "mongoose";

const postQuestionSchema = mongoose.Schema({
	title: String,
	description: String,
	creator: String,
	category: String,
	subcategory: String,
	selectedFile: String,
	likeCount: {
		type: Number,
		default: 0,
	},
	dislikeCount: {
		type: Number,
		default: 0,
	},
	answer: [
		{
			id: String,
			description: String,
			creator: String,
			likeCount: {
				type: Number,
				default: 0,
			},
			dislikeCount: {
				type: Number,
				default: 0,
			},
			createdAt: {
				type: Date,
				default: new Date(),
			},
			updatedAt: {
				type: Date,
				default: new Date(),
			},
		},
	],
	createdAt: {
		type: Date,
		default: new Date(),
	},
	updatedAt: {
		type: Date,
		default: new Date(),
	},
});

const PostQuestion = mongoose.model("PostQuestion", postQuestionSchema);

export default PostQuestion;
