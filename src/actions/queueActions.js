import * as types from "./actionTypes";

export const queueTrack = id => ({ type: types.QUEUE_TRACK, id });

export const fetchQueue = () => ({ type: types.FETCH_QUEUE });

export const fetchQueueSuccess = data => ({ type: types.FETCH_QUEUE_SUCCESS, data });

export const fetchNowPlaying = () => ({ type: types.FETCH_NOW_PLAYING });

export const fetchNowPlayingSuccess = data => ({ type: types.FETCH_NOW_PLAYING_SUCCESS, data });
