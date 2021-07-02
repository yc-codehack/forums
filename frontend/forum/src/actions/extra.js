import * as api from "../api";

export const getCategory = () => async (dispatch) => {
	try {
		const { data } = await api.categoryList();
		dispatch({ type: "FETCH_CATEGORY", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getTopUser = () => async (dispatch) => {
	try {
		const { data } = await api.topUserList();
		dispatch({ type: "FETCH_TOP_USER", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getTopCategory = () => async (dispatch) => {
	try {
		const { data } = await api.topCategoryList();
		dispatch({ type: "FETCH_TOP_CATEGORY", payload: data });
	} catch (error) {
		console.log(error);
	}
};
