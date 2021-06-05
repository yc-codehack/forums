import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchRecent = () => API.get("/question/list?filter=recent");

// AUTH
export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);

// Like Question
export const likeQuestion = (data) => {
	// console.log(data);
	API.patch("/question/like", data, {
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQGZvcnVtLmNvbSIsImlkIjoiNjBiMGYyZTcyMmE0OTQwNWE2NzcyN2RjIiwiaWF0IjoxNjIyNjkzMTMwLCJleHAiOjE2MjMyOTc5MzB9.OCzRM5gz_o2U5iluvOGmO1wK0OcwSunzAVKDvFrED9A",
		}, // *TODO Token is hard coded for testing only implement it properly
	});
};

// Dislike Question
export const dislikeQuestion = (data) => {
	// console.log(data);
	API.patch("/question/dislike", data, {
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQGZvcnVtLmNvbSIsImlkIjoiNjBiMGYyZTcyMmE0OTQwNWE2NzcyN2RjIiwiaWF0IjoxNjIyNjkzMTMwLCJleHAiOjE2MjMyOTc5MzB9.OCzRM5gz_o2U5iluvOGmO1wK0OcwSunzAVKDvFrED9A",
		}, // *TODO Token is hard coded for testing only implement it properly
	});
};

export const categoryList = () => API.get("/extra/category");
