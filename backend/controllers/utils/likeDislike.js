import Profile from "../../models/profile.js";
import PostQuestion from "../../models/postQuestion.js";

export const like = async (req, res) => {
	const post = req.body;
	console.log(post);
	console.log(post.type);
	console.log(post.quesId);
	console.log("userId", req.userId);

	if (post.type == "question") {
		console.log("=> question");
		try {
			const isLiked = await Profile.updateOne(
				{
					accountId: req.userId,
					likedQuestion: { $nin: [post.quesId] },
				},
				{
					$push: { likedQuestion: post.quesId },
				}
			);
			console.log("isLiked", isLiked);
			if (isLiked.n == 1) {
				await PostQuestion.updateOne(
					{
						_id: post.quesId,
					},
					{ $inc: { likeCount: 1 } }
				);
			}

			const isDisliked = await Profile.updateOne(
				{
					accountId: req.userId,
					dislikeQuestion: { $in: [post.quesId] },
				},
				{
					$pull: { dislikeQuestion: post.quesId },
				}
			);

			if (isDisliked.n == 1) {
				await PostQuestion.updateOne(
					{
						_id: post.quesId,
					},
					{ $inc: { dislikeCount: 1 } }
				);
			}
			return res.status(200).json({ message: "Updated" });
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	} else if (post.type == "answer") {
		try {
			const isLiked = await Profile.updateOne(
				{
					accountId: req.userId,
					likedAnswer: { $nin: [post.ansId] },
				},
				{
					$push: { likedAnswer: post.ansId },
				}
			);

			if (isLiked.n == 1) {
				await PostQuestion.updateOne(
					{
						_id: post.quesId,
					},
					{ $inc: { "answer.$[elem].likeCount": 1 } },
					{ arrayFilters: [{ "elem._id": post.ansId }] }
				);
			}

			const isDisliked = await Profile.updateOne(
				{
					accountId: req.userId,
					dislikeAnswer: { $in: [post.ansId] },
				},
				{
					$pull: { dislikeAnswer: post.ansId },
				}
			);

			if (isDisliked.n == 1) {
				await PostQuestion.updateOne(
					{
						_id: post.quesId,
					},
					{ $inc: { "answer.$[elem].dislikeCount": 1 } },
					{ arrayFilters: [{ "elem._id": post.ansId }] }
				);
			}
			return res.status(200).json({ message: "Updated" });
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
};

export const dislike = async (req, res) => {
	const post = req.body;

	if (post.type == "question") {
		try {
			const isLiked = await Profile.updateOne(
				{
					accountId: req.userId,
					likedQuestion: { $in: [post.quesId] },
				},
				{
					$pull: { likedQuestion: post.quesId },
				}
			);
			if (isLiked.n == 1) {
				await PostQuestion.updateOne(
					{
						_id: post.quesId,
					},
					{ $inc: { likeCount: -1 } }
				);
			}

			const isDisliked = await Profile.updateOne(
				{
					accountId: req.userId,
					dislikeQuestion: { $nin: [post.quesId] },
				},
				{
					$push: { dislikeQuestion: post.quesId },
				}
			);

			if (isDisliked.n == 1) {
				await PostQuestion.updateOne(
					{
						_id: post.quesId,
					},
					{ $inc: { dislikeCount: -1 } }
				);
			}
			return res.status(200).json({ message: "Updated" });
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	} else if (post.type == "answer") {
		try {
			const isLiked = await Profile.updateOne(
				{
					accountId: req.userId,
					likedAnswer: { $in: [post.ansId] },
				},
				{
					$pull: { likedAnswer: post.ansId },
				}
			);

			if (isLiked.n == 1) {
				await PostQuestion.updateOne(
					{
						_id: post.quesId,
					},
					{ $inc: { "answer.$[elem].likeCount": -1 } },
					{ arrayFilters: [{ "elem._id": post.ansId }] }
				);
			}

			const isDisliked = await Profile.updateOne(
				{
					accountId: req.userId,
					dislikeAnswer: { $nin: [post.ansId] },
				},
				{
					$push: { dislikedAnswer: post.ansId },
				}
			);

			if (isDisliked.n == 1) {
				await PostQuestion.updateOne(
					{
						_id: post.quesId,
					},
					{ $inc: { "answer.$[elem].dislikeCount": -1 } },
					{ arrayFilters: [{ "elem._id": post.ansId }] }
				);
			}
			return res.status(200).json({ message: "Updated" });
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
};
