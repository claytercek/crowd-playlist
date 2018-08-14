import * as types from "./actionTypes";
import fetch from "cross-fetch";
import Config from "../config/app";

export const queueTrack = id => dispatch => {
	dispatch({ type: "server/queueTrack", data: id });
};

export const queueUpdateLocal = data => ({ type: types.QUEUE_UPDATE_LOCAL, data });

export const fetchQueue = () => dispatch =>
	fetch(`${Config.HOST}/api/queue`)
		.then(res => res.json())
		.then(res => dispatch(queueUpdateLocal(res)));
