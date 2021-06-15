import * as actionType from "../constants/actionType.js";
// eslint-disable-next-line import/no-anonymous-default-export
export const Question = (questions = [], action) => {
	switch (action.type) {
		case "FETCH_RECENT":
			return action.payload;

		case "LIKE":
			console.log("reducers/question/LIKE", action);
			return questions.map((question) =>
				question._id === action.payload._id ? action.payload : question
			);
		case "DISLIKE":
			return questions.map((question) =>
				question._id === action.payload._id ? action.payload : question
			);

		case "CREATE":
			return [...questions, action.payload.data];

		case actionType.SEARCH_QUESTION:
			return action.payload.data;

		default:
			return questions;
	}
};

export const Autocomplete = (autocomplete_list = [], action) => {
	switch (action.type) {
		case actionType.SEARCH_AUTOCOMPLETE:
			return action.payload.data;

		default:
			return autocomplete_list;
	}
};
