import { combineReducers } from "redux";

import questions from "./questions.js";
import list from "./extra.js";

export default combineReducers({
	questions,
	list,
});
