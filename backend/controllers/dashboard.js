import UserProfile from "../models/profile.js";
import auth from "../middleware/auth.js";
import authUserInfo from "./utils/authUserInfo.js";
import CategoryInfo from "../models/categoryInfo.js";
import intToString from "./utils/convertIntToString.js";

// top users
export const getTopUser = async (req, res) => {
	try {
		const topUsers = await UserProfile.find().sort({ score: -1 }).limit(5);
		// console.log(topUsers);
		var topUsersList = await Promise.all(
			topUsers.map(async (user) => {
				const properties = {
					_id: user.accountId,
					name: user.name,
					imageUrl: user.image,
					score: intToString(user.score),
				};
				return properties;
			})
		);
		// console.log(req.headers.authorization);
		if (req.headers.authorization) {
			const userId = authUserInfo(
				req.headers.authorization.split(" ")[1]
			);
			const authUser = await UserProfile.findOne({
				accountId: userId,
			});
			if (authUser) {
				const currentUser = {
					_id: authUser.accountId,
					name: "You",
					imageUrl: authUser.image ? authUser.image : null,
					score: intToString(authUser.score),
				};
				topUsersList.push(currentUser);
			}
		}
		return res.status(200).json(topUsersList);
	} catch (error) {
		console.log(error);
		return res.status(409).json({ message: error.message });
	}
};

// top category
export const getTopCategory = async (req, res) => {
	try {
		const topCategory = await CategoryInfo.aggregate([
			{ $addFields: { score: { $sum: ["$quesCount", "$ansCount"] } } },
			{ $sort: { score: -1 } },
		]).limit(5);

		var topCategoryList = await Promise.all(
			topCategory.map((category) => {
				const properties = {
					_id: category._id,
					name: category.name,
					score: intToString(category.score),
				};
				return properties;
			})
		);

		return res.status(200).json(topCategoryList);
	} catch (error) {
		console.log(error);
		return res.status(409).json({ message: error.message });
	}
};

// export const createUserProfile = async (req, res) => {};
