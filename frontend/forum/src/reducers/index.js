import { combineReducers } from "redux";

import questions from "./questions.js";
import list from "./extra.js";
import auth from "./auth.js";

export default combineReducers({
	questions,
	list,
	auth,
});
