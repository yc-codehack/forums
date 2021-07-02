import * as actionType from "../../constants/actionType.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default (topCategory = [], action) => {
	switch (action.type) {
		case actionType.FETCH_TOP_CATEGORY:
			return action.payload;

		default:
			return topCategory;
	}
};
