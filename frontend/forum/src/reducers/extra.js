// eslint-disable-next-line import/no-anonymous-default-export
export default (list = [], action) => {
	switch (action.key) {
		case "FETCH_CATEGORY":
			console.log("reducers/extra/list/category", action.payload);
			return action.payload;

		default:
			return list;
	}
};
