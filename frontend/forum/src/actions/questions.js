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

export const createQuestion = (post) => async (dispatch) => {
	try {
		const data = await api.postQuestion(post);
		console.log("actions=>", data);
		dispatch({ type: "CREATE", payload: data });
	} catch (error) {}
};

export const questionLike = (post) => async (dispatch) => {
	try {
		const data = await api.likeQuestion(post);
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

export const autocompleteSearch = (post) => async (dispatch) => {
	try {
		const data = await api.searchAutocomplete(post);
		dispatch({ type: "SEARCH_AUTOCOMPLETE", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const questionSearch = (post) => async (dispatch) => {
	try {
		const data = await api.searchQuestion(post);
		dispatch({ type: "SEARCH", payload: data });
	} catch (error) {
		console.log(error);
	}
};
