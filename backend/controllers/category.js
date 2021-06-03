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

// get category list
export const getCategory = async (req, res) => {
	try {
		const category = await CategoryInfo.find();
		console.log(category);
		return res.status(200).json(category);
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};
