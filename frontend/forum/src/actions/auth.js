import { AUTH } from "../constants/actionType";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formData);
		dispatch({ type: AUTH, data });
		history.push("/");
	} catch (error) {
		console.log(error);
	}
};
export const signup = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signUp(formData);
		dispatch({ type: AUTH, data });
	} catch (error) {
		console.log(error);
	}
};

export const verifyUser = async (formData) => {
	try {
		const data = await api.verify(formData);
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
};
