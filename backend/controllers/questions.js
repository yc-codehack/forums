import PostQuestion from "../models/postQuestion.js";
import UserProfile from "../models/profile.js";
import CategoryInfo from "../models/categoryInfo.js";
import authUserInfo from "./utils/authUserInfo.js";

//
import moment from "moment";
import { convertTimeToString } from "../controllers/utils/time.js";
// var moment = require("moment");

// * Post new question
export const createQuestion = async (req, res) => {
	const post = req.body;
	const user = req.headers.authorization
		? authUserInfo(req.headers.authorization.split(" ")[1])
		: null;

	const newPost = new PostQuestion({
		...post,
		creator: user ? user : null,

		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});

	try {
		// saving the question
		await newPost.save();

		// incrementing questionCount of user
		user &&
			(await UserProfile.updateOne(
				{ accountId: req.userId },
				{ $inc: { questionCount: 1, score: 1 } }
			));

		// incrementing the quesCount of categoryInfo
		await CategoryInfo.updateOne(
			{ name: newPost.category },
			{ $inc: { quesCount: 1 }, lastQues: newPost._id }
		);

		// formatting acc to required output
		const userInfo = await UserProfile.findOne({
			accountId: user,
		});
		const question = {
			_id: newPost._id,
			title: newPost.title,
			description: newPost.description,
			createdAt: newPost.createdAt,
			likeCount: newPost.likeCount,
			dislikeCount: newPost.dislikeCount,
			liked: false,
			disliked: false,
			creatorId: newPost.creator,
			creatorName: userInfo ? userInfo.name : "Anonymous",
			creatorImage: userInfo
				? userInfo.image
					? userInfo.image
					: null
				: null,
		};

		return res.status(200).json(question);
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

// * Update question
export const updateQuestion = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const post = req.body;

		if (!PostQuestion.findById(_id)) {
			return res.status(404).json({ message: "Invalid Question ID" });
		}

		const nonUpdatedQuestion = await PostQuestion.findById(_id);

		const updatedQuestion = await PostQuestion.findByIdAndUpdate(
			_id,
			{ ...post, updatedAt: new Date().toISOString() },
			{
				new: true,
			}
		);

		// ! Refactor code to use something else that findOneAndUpdate (becoz it will be deprecated in future)
		if (nonUpdatedQuestion.category != updatedQuestion.category) {
			await CategoryInfo.findOneAndUpdate(
				{ name: nonUpdatedQuestion.category },
				{ $inc: { quesCount: -1 } }
			);
			await CategoryInfo.findOneAndUpdate(
				{ name: updatedQuestion.category },
				{ $inc: { quesCount: 1 } }
			);
		}

		return res.status(200).json({ updatedQuestion });
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

// * Question list for main page
export const getQuestions = async (req, res) => {
	// extract the parameters from url and store it in variable

	// **TODO Refactor this section
	try {
		const filter = req.query.filter;
		const filterInfo = req.query.filterInfo;
		const sort = req.query.sort;
		const sortInfo = req.query.sortInfo;
		const currentUserId = req.headers.authorization
			? authUserInfo(req.headers.authorization.split(" ")[1])
			: null;

		// sort acc to date
		if (filter == "recent") {
			var questionsList = await PostQuestion.find().sort({
				createdAt: -1,
			});

			var questionsIs = await Promise.all(
				questionsList.map(async (question) => {
					const currentTime = moment(
						new Date().toISOString(),
						"YYYY-MM-DD HH:mm:ss"
					);
					const createdAt = moment(
						question.createdAt,
						"YYYY-MM-DD HH:mm:ss"
					);
					const tempTime = moment.duration(
						currentTime.diff(createdAt)
					);
					const newTimeDuration = convertTimeToString(tempTime);

					const userInfo = await UserProfile.findOne({
						accountId: question.creator,
					});

					var isLiked = false;
					var isDisliked = false;

					// if user is logged in then check if the question is liked by them or not
					currentUserId &&
						((isLiked = Boolean(
							(
								await UserProfile.find({
									accountId: currentUserId,
									likedQuestion: { $in: [question._id] },
								})
							).length
						)),
						(isDisliked = Boolean(
							(
								await UserProfile.find({
									accountId: currentUserId,
									dislikedQuestion: { $in: [question._id] },
								})
							).length
						)));

					const properties = {
						_id: question._id,
						title: question.title,
						description: question.description,
						createdAt: question.createdAt,
						likeCount: question.likeCount,
						dislikeCount: question.dislikeCount,
						creatorName: userInfo ? userInfo.name : "Anonymous",
						creatorImage: userInfo
							? userInfo.image
								? userInfo.image
								: null
							: null,
						liked: isLiked,
						disliked: isDisliked,
						creatorId: question.creator,
					};
					return properties;
				})
			);
		}
		// filter acc to ( category and user ) and then sort based on (likes and date)
		else {
			var questionsList = await PostQuestion.find({
				[filter]: filterInfo,
			}).sort({ [sort]: sortInfo });

			var questionsIs = questionsList.map(async (question) => {
				const currentTime = moment(
					new Date().toISOString(),
					"YYYY-MM-DD HH:mm:ss"
				);
				const createdAt = moment(
					question.createdAt,
					"YYYY-MM-DD HH:mm:ss"
				);
				const tempTime = moment.duration(currentTime.diff(createdAt));
				const newTimeDuration = convertTimeToString(tempTime);
				const userInfo = await UserProfile.findOne({
					accountId: question.creator,
				});
				const properties = {
					_id: question._id,
					title: question.title,
					description: question.description,
					createdAt: newTimeDuration,
					likeCount: question.likeCount,
					dislikeCount: question.dislikeCount,
					creatorName: userInfo ? userInfo.name : "h",
					creatorImage: userInfo
						? userInfo.image
							? userInfo.image
							: null
						: null,
				};
				return properties;
			});
		}

		if (questionsIs.length === 0) {
			return res.status(400).json({ message: "No data found!!!" });
		}
		return res.status(200).json(questionsIs);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

// * Search question
export const searchQuestions = async (req, res) => {
	try {
		const searchItem = req.query.searchItem;
		const questionsList = await PostQuestion.find({
			title: { $regex: searchItem, $options: "i" }, // ** Uses regex to get fuzzy search functionality and option i make it case insensitive
		}).sort({ likeCount: -1 });

		// **TODO Review and try to implement text index
		// const questionList = await PostQuestion.find({
		// 	$text: { $search: searchItem, $caseSensitive: true },
		// }).sort({ score: { $meta: "textScore" } });

		var questionsIs = await Promise.all(
			questionsList.map(async (question) => {
				const currentTime = moment(
					new Date().toISOString(),
					"YYYY-MM-DD HH:mm:ss"
				);
				const createdAt = moment(
					question.createdAt,
					"YYYY-MM-DD HH:mm:ss"
				);
				const tempTime = moment.duration(currentTime.diff(createdAt));
				const newTimeDuration = convertTimeToString(tempTime);
				const userInfo = await UserProfile.findOne({
					accountId: question.creator,
				});
				const properties = {
					_id: question._id,
					title: question.title,
					description: question.description,
					createdAt: newTimeDuration,
					likeCount: question.likeCount,
					dislikeCount: question.dislikeCount,
					creatorName: userInfo ? userInfo.name : "Anonymous",
					creatorImage: userInfo
						? userInfo.image
							? userInfo.image
							: null
						: null,
				};
				return properties;
			})
		);

		if (questionsList.length === 0) {
			return res.status(400).json({ message: "No data found!!!" });
		}

		return res.status(200).json(questionsIs);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

// * Search autocomplete
export const searchBar = async (req, res) => {
	try {
		const searchItem = req.query.searchItem;
		const questionsList = await PostQuestion.find({
			title: { $regex: searchItem, $options: "i" }, // ** Uses regex to get fuzzy search functionality and option i make it case insensitive
		})
			.sort({ likeCount: -1 })
			.limit(5);
		var result = [];
		const searchResult = questionsList.map((question) => {
			result.push(question.title);
		});

		if (result.length === 0) {
			return res.status(400).json({ message: "No data found!!!" });
		}
		return res.status(200).json(result);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

// * Thread
export const getThread = async (req, res) => {
	try {
		const quesId = req.query.quesId;

		// getting current user info
		const currentUserId = req.headers.authorization
			? authUserInfo(req.headers.authorization.split(" ")[1])
			: null;

		const question = await PostQuestion.findOne({ _id: quesId });
		if (!question) {
			return res.status(400).json({ message: "No data found!!!" });
		}

		const quesUserInfo = await UserProfile.findOne({
			accountId: question.creator,
		});

		var isLiked = false;
		var isDisliked = false;

		// if user is logged in then check if the question is liked by them or not
		currentUserId &&
			((isLiked = Boolean(
				(
					await UserProfile.find({
						accountId: currentUserId,
						likedQuestion: { $in: [question._id] },
					})
				).length
			)),
			(isDisliked = Boolean(
				(
					await UserProfile.find({
						accountId: currentUserId,
						dislikedQuestion: { $in: [question._id] },
					})
				).length
			)));

		const answer = await Promise.all(
			question.answer.map(async (ans) => {
				const ansUserInfo = await UserProfile.findOne({
					accountId: ans.creator,
				});

				var ansLiked = false;
				var ansDisliked = false;

				// if user is logged in then check if the question is liked by them or not
				currentUserId &&
					((ansLiked = Boolean(
						(
							await UserProfile.find({
								accountId: currentUserId,
								likedAnswer: { $in: [ans.id] },
							})
						).length
					)),
					(ansDisliked = Boolean(
						(
							await UserProfile.find({
								accountId: currentUserId,
								dislikedAnswer: { $in: [ans.id] },
							})
						).length
					)));

				const properties = {
					id: ans._id,
					description: ans.description,
					creatorId: ansUserInfo ? ansUserInfo.creator : null,
					creatorName: ansUserInfo ? ansUserInfo.name : "Anonymous",
					creatorImage: ansUserInfo
						? ansUserInfo.image
							? ansUserInfo.image
							: null
						: null,
					createdAt: ans.createdAt,
					likeCount: ans.likeCount,
					dislikeCount: ans.dislikeCount,
					liked: ansLiked,
					dislike: ansDisliked,
				};
				return properties;
			})
		);

		var questionDetails = {
			_id: question._id,
			title: question.title,
			description: question.description,
			createdAt: question.createdAt,
			likeCount: question.likeCount,
			dislikeCount: question.dislikeCount,
			creatorId: quesUserInfo ? quesUserInfo.creator : null,
			creatorName: quesUserInfo ? quesUserInfo.name : "Anonymous",
			creatorImage: quesUserInfo
				? quesUserInfo.image
					? quesUserInfo.image
					: null
				: null,
			liked: isLiked,
			disliked: isDisliked,
			creatorId: question.creator,
			answer: answer,
		};

		return res.status(200).json(questionDetails);
	} catch (error) {
		console.log(error);
	}
};

// delete thread
export const deleteThread = async (req, res) => {
	try {
		const quesId = req.body.quesId;
		const userId = req.userId;

		if (!PostQuestion.findById(quesId)) {
			return res.status(404).json({ message: "Invalid Question ID" });
		}
		if (req.body.type === "question") {
			const data = await PostQuestion.deleteOne({
				_id: quesId,
				creator: userId,
			});

			return res.status(200).json({ _id: quesId });
		} else {
			const ansId = req.body.ansId;
			if (
				!PostQuestion.findOne(
					{ _id: quesId },
					{ answer: { $elemMatch: { _id: ansId, creator: userId } } }
				)
			) {
				return res.status(404).json({ message: "Invalid Question ID" });
			}

			const data = await PostQuestion.updateOne(
				{ _id: quesId },
				{ $pull: { answer: { _id: ansId, creator: userId } } }
			);
			return res.status(200).json({ _id: ansId });
		}
	} catch (error) {
		console.log(error);
		return res.status(409).json({ message: error.message });
	}
};
