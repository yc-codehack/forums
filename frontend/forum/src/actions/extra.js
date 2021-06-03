import * as api from "../api";

export const getCategory = () => async (dispatch) => {
	try {
		const { data } = await api.categoryList();
		console.log("actions/extra/data", data);
		dispatch({ type: "FETCH_CATEGORY", payload: data });
	} catch (error) {
		console.log(error);
	}
};
