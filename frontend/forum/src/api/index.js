import axios from "axios";

const url = "http://localhost:5000/";

export const fetchRecent = () => axios.get(url + "question/list?filter=recent");
