import * as types from "./actionTypes";
import fetch from "cross-fetch";
import Config from "../config/app";

export const queueTrack = (id, group) => dispatch => {
	dispatch({ type: "socket/queueTrack", data: id, group: group });
};

export const queueUpdateLocal = data => ({ type: types.QUEUE_UPDATE_LOCAL, data });

export const fetchQueue = group => dispatch => {
	fetch(`${Config.HOST}/api/queue/` + group)
		.then(res => res.json())
		.then(res => dispatch(queueUpdateLocal(res)));
};
