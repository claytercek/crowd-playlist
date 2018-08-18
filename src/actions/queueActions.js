import * as types from "./actionTypes";

export const queueTrack = id => ({ type: types.QUEUE_TRACK, id });

export const fetchQueue = () => ({ type: types.FETCH_QUEUE });

export const fetchQueueSuccess = data => ({ type: types.FETCH_QUEUE_SUCCESS, data });
