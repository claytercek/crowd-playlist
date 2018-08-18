import * as types from "./actionTypes";

export const playTrack = track => ({
	type: types.PLAY_TRACK,
	track
});

export const playTrackSuccess = track => ({
	type: types.PLAY_TRACK_SUCCESS,
	track
});
