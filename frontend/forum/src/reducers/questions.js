// eslint-disable-next-line import/no-anonymous-default-export
export default (questions = [], action) => {
	switch (action.type) {
		case "FETCH_RECENT":
			return action.payload;

		case "LIKE":
			return questions.map((question) =>
				question._id === action.payload._id ? action.payload : question
			);
		case "DISLIKE":
			return questions.map((question) =>
				question._id === action.payload._id ? action.payload : question
			);

		default:
			return questions;
	}
};
