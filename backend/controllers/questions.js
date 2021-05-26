import PostQuestion from "../models/postQuestion.js";

// * Question list for main page
export const getQuestions = async (req, res) => {
	try {
		const postQuestions = await PostQuestion.find();
		// console.log(postQuestions.length);

		if (postQuestions.length === 0) {
			console.log(postQuestions.length);
			return res.status(400).json({ message: "No data found!!!" });
		}

		console.log(postQuestions);
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
