import * as actionType from "../constants/actionType.js";
// eslint-disable-next-line import/no-anonymous-default-export
export const Question = (questions = [], action) => {
	switch (action.type) {
		case "FETCH_RECENT":
			return action.payload;

		case "LIKE":
			return questions.map((question) =>
				question._id === action.payload._id
					? [...question, action.payload]
					: question
			);
		case "DISLIKE":
			return questions.map((question) =>
				question._id === action.payload._id
					? [...question, action.payload]
					: question
			);

		case "CREATE":
			console.log("reducer=>", [action.payload, ...questions]);
			return [action.payload, ...questions];

		case actionType.SEARCH_QUESTION:
			return action.payload;

		default:
			return questions;
	}
};

export const Autocomplete = (autocomplete_list = [], action) => {
	switch (action.type) {
		case actionType.SEARCH_AUTOCOMPLETE:
			return action.payload.data;

		default:
			return autocomplete_list;
	}
};

export const Thread = (thread = null, action) => {
	switch (action.type) {
		case actionType.FETCH_THREAD:
			return action.payload;

		case actionType.LIKE_THREAD_QUESTION:
			thread = {
				...thread,
				liked: action.payload.liked,
				disliked: action.payload.disliked,
				likeCount: action.payload.likeCount,
				dislikeCount: action.payload.dislikeCount,
			};
			return thread;

		case actionType.DISLIKE_THREAD_QUESTION:
			thread = {
				...thread,
				liked: action.payload.liked,
				disliked: action.payload.disliked,
				likeCount: action.payload.likeCount,
				dislikeCount: action.payload.dislikeCount,
			};
			return thread;

		case actionType.LIKE_THREAD_ANSWER:
			return {
				...thread,
				answer: thread.answer.map((ans) =>
					ans.id === action.payload.id
						? {
								...ans,
								likeCount: action.payload.likeCount,
								dislikeCount: action.payload.dislikeCount,
								likedCount: action.payload.likedCount,
								dislikedCount: action.payload.dislikedCount,
						  }
						: ans
				),
			};

		case actionType.DISLIKE_THREAD_ANSWER:
			return {
				...thread,
				answer: thread.answer.map((ans) =>
					ans.id === action.payload.id
						? {
								...ans,
								likeCount: action.payload.likeCount,
								dislikeCount: action.payload.dislikeCount,
								likedCount: action.payload.likedCount,
								dislikedCount: action.payload.dislikedCount,
						  }
						: ans
				),
			};

		case actionType.POST_ANSWER:
			return {
				...thread,
				answer: [...thread.answer, action.payload.postedAnswer],
			};

		default:
			return thread;
	}
};
