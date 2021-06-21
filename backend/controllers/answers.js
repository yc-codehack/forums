import PostQuestion from "../models/postQuestion.js";
import Profile from "../models/profile.js";
import CategoryInfo from "../models/categoryInfo.js";
import UserProfile from "../models/profile.js";
import authUserInfo from "./utils/authUserInfo.js";

import { createRequire } from "module";

// * Post new answer
export const createAnswer = async (req, res) => {
	const require = createRequire(import.meta.url);
	var ObjectID = require("mongodb").ObjectID;
	var objectId = new ObjectID();

	const currentUserId = req.headers.authorization
		? authUserInfo(req.headers.authorization.split(" ")[1])
		: null;

	const userInfo = await UserProfile.findOne({ accountId: currentUserId });

	try {
		const newPost = await PostQuestion.updateOne(
			{ _id: post.quesId },
			{
				$push: {
					answer: {
						...post,
						_id: objectId,
						creator: req.userId,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					},
				},
			}
		);

		// incrementing answerCount of user
		await Profile.updateOne(
			{ accountId: req.userId },
			{ $inc: { answerCount: 1, score: 1 } }
		);

		// incrementing the ansCount of categoryInfo
		const question = await PostQuestion.findOne({ _id: post.quesId });
		await CategoryInfo.updateOne(
			{ name: question.category },
			{ $inc: { ansCount: 1 } }
		);

		const answer = await PostQuestion.find(
			{ _id: post.quesId },
			{ answer: { $elemMatch: { _id: objectId } } }
		);

		const postedAnswer = {
			_id: answer[0].answer[0]._id,
			description: answer[0].answer[0].description,
			likeCount: answer[0].answer[0].likeCount,
			dislikeCount: answer[0].answer[0].dislikeCount,
			createdAt: answer[0].answer[0].createdAt,
			creatorName: userInfo ? userInfo.name : "Anonymous",
			creatorImage: userInfo
				? userInfo.image
					? userInfo.image
					: null
				: null,
			liked: false,
			disliked: false,
		};

		return res.status(200).json({ postedAnswer });
	} catch (error) {
		console.log(error);
		return res.status(409).json({ message: error.message });
	}
};
