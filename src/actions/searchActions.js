import * as types from "./actionTypes";
import fetch from "cross-fetch";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export const fetchSearch = query => (dispatch, getState) => {
	dispatch(searchTracks(query));

	let shouldAddWildcard = false;
	if (query.length > 1) {
		const words = query.split(" ");
		const lastWord = words[words.length - 1];
		if (/^[a-z0-9\s]+$/i.test(lastWord) && query.lastIndexOf("*") !== query.length - 1) {
			shouldAddWildcard = true;
		}
	}

	const wildcardQuery = `${query}${shouldAddWildcard ? "*" : ""}`; // Trick to improve search results

	return fetch(`${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(wildcardQuery)}&type=track&limit=10`, {
		headers: {
			Authorization: "Bearer " + getState().session.access_token
		}
	})
		.then(res => res.json())
		.then(res => {
			dispatch(searchTracksSuccess(query, res.tracks.items));
		});
};

export const searchTracks = query => {
	return { type: types.SEARCH_TRACKS, query };
};

export const searchTracksSuccess = (query, results) => ({
	type: types.SEARCH_TRACKS_SUCCESS,
	query,
	results
});

export const resetSearch = () => ({ type: types.SEARCH_TRACKS_RESET });
