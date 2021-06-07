import { combineReducers } from "redux";

import questions from "./questions.js";
import list from "./extra.js";
import auth from "./auth.js";
import topUser from "./dashboard/topUser.js";
import topCategory from "./dashboard/topCategory.js";

export default combineReducers({
	questions,
	list,
	auth,
	topUser,
	topCategory,
});
