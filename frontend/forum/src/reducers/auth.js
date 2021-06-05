import * as actionType from "../constants/actionType.js";

const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case actionType.AUTH:
			console.log("Reducer=>", ...action?.data);
			localStorage.setItem(
				"profile",
				JSON.stringify({ ...action?.data })
			);
			console.log("Reducer=>", ...action?.data);
			// localStorage.setItem("temp", JSON.stringify({ hi: "dnfkj" }));
			return {
				...state,
				authData: action?.data,
				loading: false,
				error: null,
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
