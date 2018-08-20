import * as types from "./actionTypes";

export const voteUp = trackIndex => ({
	type: types.VOTE_UP,
	trackIndex
});

export const voteNeutral = trackIndex => ({
	type: types.VOTE_NEUTRAL,
	trackIndex
});

export const voteDown = trackIndex => ({
	type: types.VOTE_DOWN,
	trackIndex
});
