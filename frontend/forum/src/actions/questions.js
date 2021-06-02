import * as api from "../api";

// Action Creators
export const getRecent = () => async (dispatch) => {
	try {
		const { data } = await api.fetchRecent();
		dispatch({ type: "FETCH_RECENT", payload: data });
	} catch (error) {}
};
