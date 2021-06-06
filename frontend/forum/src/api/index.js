import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// * Adds authorisation token in header of api request
API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

export const fetchRecent = () => API.get("/question/list?filter=recent");

// AUTH
export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);

// Like Question
export const likeQuestion = (data) => {
	API.patch("/question/like", data);
};

// Dislike Question
export const dislikeQuestion = (data) => {
	API.patch("/question/dislike", data);
};

// category list {category page}
export const categoryList = () => API.get("/extra/category");
