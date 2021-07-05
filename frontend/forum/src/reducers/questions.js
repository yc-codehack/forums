import * as actionType from "../constants/actionType.js";
// eslint-disable-next-line import/no-anonymous-default-export
export const Question = (
	questions = {
		totalPages: 0,
		next: { page: null, limit: null },
		previous: { page: null, limit: null },
		current: { page: null, limit: null },
		result: [],
	},
	action
) => {
	switch (action.type) {
		case "FETCH_RECENT":
			if (action.payload.current.page == 1) {
				return {
					...questions,
					totalPages: action.payload.totalPages,
					next: { ...action.payload.next },
					previous: { ...action.payload.previous },
					current: { ...action.payload.current },
					result: [...action.payload.result],
				};
			}
			return {
				...questions,
				totalPages: action.payload.totalPages,
				next: { ...action.payload.next },
				previous: { ...action.payload.previous },
				current: { ...action.payload.current },
				result: [...questions.result, ...action.payload.result],
			};

		case "CATEGORY_QUESTION":
			return {
				...questions,
				totalPages: 1,
				next: { page: null, limit: 50 },
				previous: { page: null, limit: 50 },
				current: { page: 1, limit: 50 },
				result: [...action.payload],
			};

		case "LIKE":
			return questions.result.map((question) =>
				question._id === action.payload._id
					? [...question, action.payload]
					: question
			);
		case "DISLIKE":
			return questions.result.map((question) =>
				question._id === action.payload._id
					? [...question, action.payload]
					: question
			);

		case "CREATE":
			console.log("reducer=>", action.payload);
			return {
				...questions,
				result: [action.payload, ...questions.result],
			};

		case "SEARCH":
			console.log("reducer", action.payload);
			return {
				...questions,
				totalPages: 1,
				next: { page: null, limit: 50 },
				previous: { page: null, limit: 50 },
				current: { page: 1, limit: 50 },
				result: [...action.payload],
			};

		case actionType.DELETE_QUESTION:
			console.log("delete question reducer", questions);
			const result = questions.result.filter(
				(question) => question._id !== action.payload._id
			);
			console.log("delete reducer result", result);
			//console.log("question reducer", questions);

			return questions;

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

		case actionType.DELETE_ANSWER:
			const answer = thread.answer.filter(
				(ans) => ans._id !== action.payload._id
			);
			answer.splice(answer.indexOf(action.payload._id), 1);
			console.log("ans reducer", answer);
			return {
				...thread,
				answer: answer,
			};

		case actionType.UPDATE_QUESTION:
			return {
				...thread,
				title: action.payload.title,
				description: action.payload.description,
				category: action.payload.category,
				subcategory: action.payload.subcategory,
			};

		case actionType.UPDATE_ANSWER:
			thread = {
				...thread,
				answer: thread.answer.map((ans) =>
					ans.id === action.payload.ansId
						? {
								...ans,
								["description"]: action.payload.description,
						  }
						: ans
				),
			};
			return thread;

		case actionType.SORTED_ANSWER:
			thread = {
				...thread,
				answer: action.payload,
			};
			return thread;

		default:
			return thread;
	}
};
