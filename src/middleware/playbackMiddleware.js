import * as types from "../actions/actionTypes";
import fetch from "cross-fetch";

// import { playTrackSuccess } from "../actions/playbackActions";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export default store => next => action => {
	const result = next(action);
	switch (action.type) {
		case types.PLAY_TRACK:
			console.log("play track");
			return fetch(`${SPOTIFY_API_BASE}/me/player/play`, {
				method: "PUT",
				headers: {
					Authorization: "Bearer " + store.getState().session.host_token
				},
				body: JSON.stringify({ uris: ["spotify:track:" + action.track.id] })
			})
				.then(res => res.json())
				.then(res => console.log(res));
		default:
			break;
	}

	return result;
};
