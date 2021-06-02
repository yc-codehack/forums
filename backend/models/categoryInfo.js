import mongoose from "mongoose";

const categoryInfoSchema = mongoose.Schema({
	name: String,
	description: String,
	image: String,
	quesCount: {
		type: Number,
		default: 0,
	},
	ansCount: {
		type: Number,
		default: 0,
	},
	lastQues: String,
});

const CategoryInfo = mongoose.model("CategoryInfo", categoryInfoSchema);

export default CategoryInfo;
