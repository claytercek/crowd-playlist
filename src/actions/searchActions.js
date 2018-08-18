import * as types from "./actionTypes";
import fetch from "cross-fetch";

export const searchTracks = query => {
	return { type: types.SEARCH_TRACKS, query };
};

export const searchTracksSuccess = (query, results) => ({
	type: types.SEARCH_TRACKS_SUCCESS,
	query,
	results
});

export const resetSearch = () => ({ type: types.SEARCH_TRACKS_RESET });
