import * as api from "../api";

export const getCategory = () => async (dispatch) => {
	try {
		const { data } = await api.categoryList();
		dispatch({ type: "FETCH_CATEGORY", payload: data });
	} catch (error) {
		console.log(error);
	}
};
