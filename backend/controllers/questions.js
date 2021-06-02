import PostQuestion from "../models/postQuestion.js";
import UserProfile from "../models/profile.js";
import CategoryInfo from "../models/categoryInfo.js";

//
import moment from "moment";
import { convertTimeToString } from "../controllers/utils/time.js";
// var moment = require("moment");

// * Post new question
export const createQuestion = async (req, res) => {
	const post = req.body;

	const newPost = new PostQuestion({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});

	try {
		// saving the question
		await newPost.save();

		// incrementing questionCount of user
		await UserProfile.updateOne(
			{ accountId: req.userId },
			{ $inc: { questionCount: 1 } }
		);

		// incrementing the quesCount of categoryInfo
		await CategoryInfo.updateOne(
			{ name: newPost.category },
			{ $inc: { quesCount: 1 } }
		);

		return res.status(200).json(newPost);
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

		// sort acc to date
		if (filter == "recent") {
			var questionsList = await PostQuestion.find().sort({
				createdAt: -1,
			});

			// console.log(profile);

			// console.log(questionsList.createdAt);

			var i = 0;
			var questionsIs = questionsList.map((question) => {
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

				var properties = {
					_id: question._id,
					title: question.title,
					description: question.description,
					createdAt: newTimeDuration,
					likeCount: question.likeCount,
					dislikeCount: question.dislikeCount,
					creatorName: "Static",
				};

				return properties;
			});
		}
		// filter acc to ( category and user ) and then sort based on (likes and date)
		else {
			var questionsList = await PostQuestion.find({
				[filter]: filterInfo,
			}).sort({ [sort]: sortInfo });

			var questionsIs = questionsList.map((question) => {
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
				const userInfo = UserProfile.find({
					accountId: question.creator,
				});

				var properties = {
					_id: question._id,
					title: question.title,
					description: question.description,
					createdAt: newTimeDuration,
					likeCount: question.likeCount,
					dislikeCount: question.dislikeCount,
					creatorName: "Static",
				};
				return properties;
			});
		}

		if (questionsIs.length === 0) {
			return res.status(400).json({ message: "No data found!!!" });
		}

		// console.log(postQuestions);
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

		var questionsIs = questionsList.map((question) => {
			const currentTime = moment(
				new Date().toISOString(),
				"YYYY-MM-DD HH:mm:ss"
			);
			const createdAt = moment(question.createdAt, "YYYY-MM-DD HH:mm:ss");
			const tempTime = moment.duration(currentTime.diff(createdAt));
			const newTimeDuration = convertTimeToString(tempTime);
			const userInfo = UserProfile.find({
				accountId: question.creator,
			});

			var properties = {
				_id: question._id,
				title: question.title,
				description: question.description,
				createdAt: newTimeDuration,
				likeCount: question.likeCount,
				dislikeCount: question.dislikeCount,
				creatorName: "Static",
			};
			return properties;
		});

		if (questionsList.length === 0) {
			return res.status(400).json({ message: "No data found!!!" });
		}

		return res.status(200).json(questionsIs);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const getUserInfo = async (creatorId) => {
	const info = await UserProfile.find({ accountId: creatorId });
	// console.log(info);
	return info;
};
