import PostQuestion from "../models/postQuestion.js";

// * Post new question
export const createQuestion = async (req, res) => {
	const post = req.body;

	const newPost = new PostQuestion({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});

	try {
		await newPost.save();

		return res.status(201).json(newPost);
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

// * Question list for main page
export const getQuestions = async (req, res) => {
	// extract the parameters from url and store it in variable

	// **TODO Refactor this section
	try {
		const filter = req.params.filter;
		const filterInfo = req.params.filterInfo;
		const sort = req.params.sort;
		const sortInfo = req.params.sortInfo;
		console.log(filter, filterInfo, sort, sortInfo);

		// sort acc to date
		if (filter == "recent") {
			var questionsList = await PostQuestion.find().sort({
				createdAt: -1,
			});
		}
		// filter acc to ( category and user ) and then sort based on (likes and date)
		else {
			var questionsList = await PostQuestion.find({
				[filter]: filterInfo,
			}).sort({ [sort]: sortInfo });
		}

		if (questionsList.length === 0) {
			return res.status(400).json({ message: "No data found!!!" });
		}

		// console.log(postQuestions);
		return res.status(200).json(questionsList);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

// * Search question
export const searchQuestions = async (req, res) => {
	try {
		const searchItem = req.query.searchItem;
		const questionList = await PostQuestion.find({
			title: { $regex: searchItem, $options: "i" }, // ** Uses regex to get fuzzy search functionality and option i make it case insensitive
		}).sort({ likeCount: -1 });

		// **TODO Review and try to implement text index
		// const questionList = await PostQuestion.find({
		// 	$text: { $search: searchItem, $caseSensitive: true },
		// }).sort({ score: { $meta: "textScore" } });

		if (questionsList.length === 0) {
			return res.status(400).json({ message: "No data found!!!" });
		}

		return res.status(200).json(questionList);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};
