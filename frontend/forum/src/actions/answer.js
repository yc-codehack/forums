import * as api from "../api";

export const createAnswer = (post) => async (dispatch) => {
	try {
		const { data } = await api.postAnswer(post);
		dispatch({ type: "POST_ANSWER", payload: data });
	} catch (error) {
		console.log(error);
	}
};
