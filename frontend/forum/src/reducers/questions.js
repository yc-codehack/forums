export default (questions = [], action) => {
	switch (action.type) {
		case "FETCH_RECENT":
			return action.payload;

		default:
			return questions;
	}
};
