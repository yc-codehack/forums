import PostQuestion from "../models/postQuestion.js";
import Profile from "../models/profile.js";
import CategoryInfo from "../models/categoryInfo.js";

// * Post new answer
export const createAnswer = async (req, res) => {
	const post = req.body;

	try {
		const newPost = await PostQuestion.updateOne(
			{ _id: post.quesId },
			{
				$push: {
					answer: {
						...post,
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
			{ $inc: { answerCount: 1 } }
		);

		// incrementing the quesCount of categoryInfo
		const question = await PostQuestion.findOne({ _id: post.quesId });
		console.log(question.category);
		await CategoryInfo.updateOne(
			{ name: question.category },
			{ $inc: { ansCount: 1 } }
		);

		return res.status(200).json({ newPost });
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};
