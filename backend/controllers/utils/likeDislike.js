import Profile from "../../models/profile.js";
import PostQuestion from "../../models/postQuestion.js";

export const like = async (req, res) => {
	const post = req.body;
	// console.log("post", post.quesId);

	if (post.type == "question") {
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
			if (isLiked.n == 1) {
				await PostQuestion.updateOne(
					{
						_id: post.quesId,
					},
					{ $inc: { likeCount: 1 } }
				);
			}
			if (isLiked.n == 0) {
				const isRemoveLike = await Profile.updateOne(
					{
						accountId: req.userId,
						likedQuestion: { $in: [post.quesId] },
					},
					{
						$pull: {
							likedQuestion: post.quesId,
						},
					}
				);
				if (isRemoveLike.n == 1) {
					await PostQuestion.updateOne(
						{
							_id: post.quesId,
						},
						{ $inc: { likeCount: -1 } }
					);
				}
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

			const question = await PostQuestion.findOne({ _id: post.quesId });
			const questionData = {
				_id: question._id,
				likeCount: question.likeCount,
				dislikeCount: question.dislikeCount,
				liked: Boolean(isLiked.n),
				disliked: Boolean(isDisliked.n),
			};
			return res.status(200).json(questionData);
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

			if (isLiked.n == 0) {
				const isRemoveLike = await Profile.updateOne(
					{
						accountId: req.userId,
						likedAnswer: { $in: [post.ansId] },
					},
					{
						$pull: { likedAnswer: post.ansId },
					}
				);
				if (isRemoveLike.n == 1) {
					await PostQuestion.updateOne(
						{
							_id: post.quesId,
						},
						{ $inc: { "answer.$[elem].likeCount": -1 } },
						{ arrayFilters: [{ "elem._id": post.ansId }] }
					);
				}
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
			const answer = await PostQuestion.findOne(
				{ _id: post.quesId },
				{ answer: { $elemMatch: { _id: post.ansId } } }
			);
			// console.log("likeDislike", answer);

			const answerData = {
				id: answer.answer[0]._id,
				likeCount: answer.answer[0].likeCount,
				dislikeCount: answer.answer[0].dislikeCount,
				liked: Boolean(isLiked.n),
				disliked: Boolean(isDisliked.n),
			};
			// console.log("likeDislike", answerData);
			return res.status(200).json(answerData);
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

			if (isDisliked.n == 0) {
				const isRemoveDislike = await Profile.updateOne(
					{
						accountId: req.userId,
						dislikeQuestion: { $in: [post.quesId] },
					},
					{
						$pull: { dislikeQuestion: post.quesId },
					}
				);
				if (isRemoveDislike) {
					await PostQuestion.updateOne(
						{
							_id: post.quesId,
						},
						{ $inc: { dislikeCount: 1 } }
					);
				}
			}

			const question = await PostQuestion.findOne({ _id: post.quesId });
			const questionData = {
				_id: question._id,
				likeCount: question.likeCount,
				dislikeCount: question.dislikeCount,
				liked: Boolean(isLiked.n),
				disliked: Boolean(isDisliked.n),
			};

			return res.status(200).json(questionData);
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

			if (isDisliked.n == 0) {
				const isRemoveDislike = await Profile.updateOne(
					{
						accountId: req.userId,
						dislikeAnswer: { $in: [post.ansId] },
					},
					{
						$pull: { dislikedAnswer: post.ansId },
					}
				);
				if (isRemoveDislike.n == 1) {
					await PostQuestion.updateOne(
						{
							_id: post.quesId,
						},
						{ $inc: { "answer.$[elem].dislikeCount": 1 } },
						{ arrayFilters: [{ "elem._id": post.ansId }] }
					);
				}
			}

			const answer = await PostQuestion.findOne(
				{ _id: post.quesId },
				{ answer: { $elemMatch: { _id: post.ansId } } }
			);

			const answerData = {
				id: answer.answer[0]._id,
				likeCount: answer.answer[0].likeCount,
				dislikeCount: answer.answer[0].dislikeCount,
				liked: Boolean(isLiked.n),
				disliked: Boolean(isDisliked.n),
			};
			return res.status(200).json(answerData);
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
};
