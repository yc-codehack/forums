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
		const { data } = await api.postQuestion(post);
		dispatch({ type: "CREATE", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updateQuestion = (post) => async (dispatch) => {
	try {
		console.log("action post", post);
		const { data } = await api.patchQuestion(post);

		console.log("action data", data);
		dispatch({ type: "UPDATE_QUESTION", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const questionLike = (post) => async (dispatch) => {
	try {
		const { data } = await api.like(post);
		dispatch({ type: "LIKE", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const threadQuesLike = (post) => async (dispatch) => {
	try {
		const { data } = await api.like(post);
		post.type === "question"
			? dispatch({ type: "LIKE_THREAD_QUESTION", payload: data })
			: dispatch({ type: "LIKE_THREAD_ANSWER", payload: data });
	} catch (error) {
		console.log(error);
	}
};
export const threadQuesDislike = (post) => async (dispatch) => {
	try {
		const { data } = await api.dislike(post);
		post.type === "question"
			? dispatch({ type: "DISLIKE_THREAD_QUESTION", payload: data })
			: dispatch({ type: "DISLIKE_THREAD_ANSWER", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const questionDelete = (post) => async (dispatch) => {
	try {
		const { data } = await api.removeThread(post);
		dispatch({ type: "DELETE_QUESTION", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const questionDislike = (post) => async (dispatch) => {
	try {
		const data = await api.dislike(post);
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
		const { data } = await api.searchQuestion(post);
		dispatch({ type: "SEARCH", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getThread = (post) => async (dispatch) => {
	try {
		const { data } = await api.fetchThread(post);
		dispatch({ type: "FETCH_THREAD", payload: data });
	} catch (error) {
		console.log(error);
	}
};
