import * as types from "../actions/actionTypes";
import { searchTracksSuccess } from "../actions/searchActions";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export default store => next => action => {
	const result = next(action);
	switch (action.type) {
		case types.SEARCH_TRACKS: {
			var query = action.query;
			let shouldAddWildcard = false;
			if (query.length > 1) {
				const words = query.split(" ");
				const lastWord = words[words.length - 1];
				if (/^[a-z0-9\s]+$/i.test(lastWord) && query.lastIndexOf("*") !== query.length - 1) {
					shouldAddWildcard = true;
				}
			}
			const wildcardQuery = `${query}${shouldAddWildcard ? "*" : ""}`; // Trick to improve search results

			return fetch(`${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(wildcardQuery)}&type=track&limit=15`, {
				headers: {
					Authorization: "Bearer " + store.getState().session.access_token
				}
			})
				.then(res => res.json())
				.then(res => {
					store.dispatch(searchTracksSuccess(query, res.tracks.items));
				});
		}
		default:
			break;
	}

	return result;
};
