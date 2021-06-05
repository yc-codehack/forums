import { AUTH } from "../constants/actionType";
import * as api from "../api";

export const signin = (formData, router) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formData);
		console.log("action/signIn", data);
		dispatch({ type: AUTH, data });
		router.push("/");
	} catch (error) {
		console.log(error);
	}
};
export const signup = (formData, router) => async (dispatch) => {
	try {
		const { data } = await api.signUp(formData);
		console.log("action/signUp", data);
		dispatch({ type: AUTH, data });
		router.push("/");
	} catch (error) {
		console.log(error);
	}
};
