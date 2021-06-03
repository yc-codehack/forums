import * as api from "../api";

// Action Creators
export const getRecent = () => async (dispatch) => {
	try {
		const { data } = await api.fetchRecent();
		dispatch({ type: "FETCH_RECENT", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const questionLike = (post) => async (dispatch) => {
	try {
		const data = await api.likeQuestion(post);
		console.log(data);
		dispatch({ type: "LIKE", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const questionDislike = (post) => async (dispatch) => {
	try {
		const data = await api.dislikeQuestion(post);
		dispatch({ type: "DISLIKE", payload: data });
	} catch (error) {
		console.log(error);
	}
};
