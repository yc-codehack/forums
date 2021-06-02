import CategoryInfo from "../models/categoryInfo.js";

// * Post new category
export const createCategory = async (req, res) => {
	const post = req.body;

	const newPost = new CategoryInfo({ ...post });

	try {
		await newPost.save();

		return res.status(200).json(newPost);
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};
