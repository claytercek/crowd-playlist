import * as types from "./actionTypes";

export const playTrack = track => ({
	type: types.PLAY_TRACK,
	track
});

export const playTrackSuccess = track => ({
	type: types.PLAY_TRACK_SUCCESS,
	track
});

export const pause = () => ({
	type: types.PAUSE
});

export const resume = () => ({
	type: types.RESUME
});

export const skip = () => ({
	type: types.SKIP
});

export const clear = () => ({
	type: types.CLEAR
});
