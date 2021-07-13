import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({ baseURL: "https://yc-forum-v1.herokuapp.com" });

// * Adds authorisation token in header of api request
API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

export const fetchRecent = (formData) =>
	API.get(
		`/question/list?filter=recent&page=${formData.page}&limit=${formData.limit}&sort=${formData.sort}&sortInfo=${formData.sortInfo}`
	);

// AUTH
export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);
export const verify = (formData) => API.post("/auth/verify", formData);

// Like Question
export const like = (formData) => API.patch("/question/like", formData);

// Dislike Question
export const dislike = (formData) => API.patch("/question/dislike", formData);

// category list {category page}
export const categoryList = () => API.get("/extra/category");
// category question list
export const categoryQuestion = (formData) =>
	API.get(
		`/question/list?filter=category&filterInfo=${formData.filterInfo}&sort=likeCount&sortInfo=${formData.sortInfo}&page=${formData.page}&limit=${formData.limit}`
	);

// top list
export const topUserList = () => API.get("/extra/topUser");
export const topCategoryList = () => API.get("/extra/topCategory");

// create question
export const postQuestion = (formData) => API.post("/question/new", formData);

// update question
export const patchQuestion = (formData) =>
	API.post("/question/update", formData);

// search question autocomplete
export const searchAutocomplete = (searchItem) =>
	API.get(`/question/search/autocomplete?searchItem=${searchItem}`);

// search question
export const searchQuestion = (searchItem) =>
	API.get(`/question/search?filter=search&searchItem=${searchItem}`);

// get question
export const fetchThread = (id) => API.get(`/question/thread?quesId=${id}`);

// delete thread
export const removeThread = (formData) =>
	API.post("/question/thread/delete", formData);

// post answer
export const postAnswer = (formData) => API.post("/answer/new/", formData);

// update answer
export const patchAnswer = (formData) => API.patch("/answer/update/", formData);
