import * as actionType from "../../constants/actionType.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default (topUser = [], action) => {
	switch (action.type) {
		case actionType.FETCH_TOP_USER:
			return action.payload;

		default:
			return topUser;
	}
};
