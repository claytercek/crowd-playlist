import * as types from "./actionTypes";
import fetch from "cross-fetch";
import * as Config from "../config/app";

export const updateTokenSuccess = (access_token, expires_in) => ({
	type: types.UPDATE_TOKEN_SUCCESS,
	access_token,
	expires_in
});

export const updateToken = () => dispatch => {
	return fetch(`${Config.HOST}/auth/token`, {
		method: "GET"
	})
		.then(res => res.json(), error => console.log("Error fetching token.", error))
		.then(res => {
			dispatch(updateTokenSuccess(res.access_token, res.expires_in));
		});
};
