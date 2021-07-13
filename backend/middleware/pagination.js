import PostQuestion from "../models/postQuestion.js";

const paginatedResults = async (req, res, next) => {
	// 🡻 getting info from url
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const filter = req.query.filter;
	const filterInfo = req.query.filterInfo;
	const sort = req.query.sort;
	const sortInfo = req.query.sortInfo;

	const searchItem = req.query.searchItem;

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const result = {};
	var count;

	if (filter == "recent" && sort == "likeCount") {
		try {
			result.results = await PostQuestion.find()
				.sort({ [sort]: sortInfo })
				.limit(limit)
				.skip(startIndex);
			count = await PostQuestion.countDocuments();
			console.log(result.results);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error.message });
		}
	} else if (filter == "recent") {
		try {
			result.results = await PostQuestion.find()
				.sort({
					createdAt: -1,
				})
				.limit(limit)
				.skip(startIndex);
			count = await PostQuestion.countDocuments();
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error.message });
		}
	} else {
		try {
			result.results = await PostQuestion.find({
				[filter]: filterInfo,
			})
				.sort({ [sort]: sortInfo })
				.limit(limit)
				.skip(startIndex);
			count = await PostQuestion.countDocuments({
				[filter]: filterInfo,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error.message });
		}
	}

	result.totalPages = Math.ceil(count / limit);
	if (endIndex < count) {
		result.next = {
			page: page + 1,
			limit: limit,
		};
	} else {
		result.next = {
			page: null,
			limit: limit,
		};
	}
	if (startIndex > 0) {
		result.previous = {
			page: page - 1,
			limit: limit,
		};
	} else {
		result.previous = {
			page: null,
			limit: limit,
		};
	}
	result.current = {
		page: page,
		limit: limit,
	};
	try {
		// 🡻 storing the data in req
		req.paginatedResults = result;
		next(); // pass the action to next thing
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export default paginatedResults;
