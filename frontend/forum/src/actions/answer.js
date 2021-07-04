import * as api from "../api";

export const createAnswer = (post) => async (dispatch) => {
	try {
		const { data } = await api.postAnswer(post);
		dispatch({ type: "POST_ANSWER", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updateAnswer = (post) => async (dispatch) => {
	try {
		const { data } = await api.patchAnswer(post);
		dispatch({ type: "UPDATE_ANSWER", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const answerDelete = (post) => async (dispatch) => {
	try {
		const { data } = await api.removeThread(post);
		dispatch({ type: "DELETE_ANSWER", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const sortAnswer = (answer) => async (dispatch) => {
	try {
		console.log("action", answer);
		dispatch({ type: "SORTED_ANSWER", payload: answer });
	} catch (error) {
		console.log(error);
	}
};
