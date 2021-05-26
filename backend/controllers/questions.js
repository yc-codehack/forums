import PostQuestion from "../models/postQuestion.js";

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
			var postQuestions = await PostQuestion.find().sort({
				createdAt: -1,
			});
		}
		// filter acc to category and then sort
		else if (filter === "category") {
			var postQuestions = await PostQuestion.find({
				[filter]: filterInfo,
			}).sort({ [sort]: sortInfo });
		}

		if (postQuestions.length === 0) {
			return res.status(400).json({ message: "No data found!!!" });
		}

		// console.log(postQuestions);
		return res.status(200).json(postQuestions);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

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
