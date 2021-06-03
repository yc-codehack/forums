import axios from "axios";

const url = "http://localhost:5000/";

export const fetchRecent = () => axios.get(url + "question/list?filter=recent");
export const likeQuestion = (data) => {
	console.log(data);
	axios.patch(url + "question/like", data, {
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQGZvcnVtLmNvbSIsImlkIjoiNjBiMGYyZTcyMmE0OTQwNWE2NzcyN2RjIiwiaWF0IjoxNjIyNjkzMTMwLCJleHAiOjE2MjMyOTc5MzB9.OCzRM5gz_o2U5iluvOGmO1wK0OcwSunzAVKDvFrED9A",
		}, // *TODO Token is hard coded for testing only implement it properly
	});
};
export const dislikeQuestion = (data) => {
	console.log(data);
	axios.patch(url + "question/dislike", data, {
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQGZvcnVtLmNvbSIsImlkIjoiNjBiMGYyZTcyMmE0OTQwNWE2NzcyN2RjIiwiaWF0IjoxNjIyNjkzMTMwLCJleHAiOjE2MjMyOTc5MzB9.OCzRM5gz_o2U5iluvOGmO1wK0OcwSunzAVKDvFrED9A",
		}, // *TODO Token is hard coded for testing only implement it properly
	});
};
