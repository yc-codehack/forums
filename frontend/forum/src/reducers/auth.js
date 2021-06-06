import * as actionType from "../constants/actionType.js";

const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case actionType.AUTH:
			localStorage.setItem(
				"profile",
				JSON.stringify({ ...action?.data })
			);
			return {
				...state,
				authData: action?.data,
			};

		case actionType.LOGOUT:
			console.log("logout");
			localStorage.clear();
			return { ...state, authData: null };

		default:
			return state;
	}
};

export default authReducer;
