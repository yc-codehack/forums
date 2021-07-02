import { combineReducers } from "redux";

import { Question, Autocomplete, Thread } from "./questions.js";
import list from "./extra.js";
import auth from "./auth.js";
import topUser from "./dashboard/topUser.js";
import topCategory from "./dashboard/topCategory.js";

export default combineReducers({
	Question,
	list,
	auth,
	topUser,
	topCategory,
	Autocomplete,
	Thread,
});
