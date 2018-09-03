import * as types from "../actions/actionTypes";
import fetch from "cross-fetch";
import { clear, playTrack } from "../actions/playbackActions";

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
				.then(res => {
					if (res.error) {
						switch (res.error.status) {
							case 401: {
								alert("Invalid Access token. Try recreating room.");
								window.location.href = "/";
								break;
							}
							case 403: {
								alert("Sorry, because of the limitation's of spotify's api, only premium users can host with crowd.");
								window.location.href = "/";
								break;
							}
							case 404: {
								alert(
									"It looks like we couldn't find a place to play this song; make sure spotify is open and you're logged in with the same account you used to log in here, then try re-adding your song to the queue. \n\nIf spotify is open, try quickly playing and pausing, then adding a new track here."
								);
								store.dispatch(clear());
								break;
							}
							default:
								break;
						}
					}
				});
		case types.PAUSE:
			return fetch(`${SPOTIFY_API_BASE}/me/player/pause`, {
				method: "PUT",
				headers: {
					Authorization: "Bearer " + store.getState().session.host_token
				}
			})
				.then(res => res.json())
				.then(res => console.log(res));
		case types.SKIP:
			return fetch(`${SPOTIFY_API_BASE}/me/player/pause`, {
				method: "PUT",
				headers: {
					Authorization: "Bearer " + store.getState().session.host_token
				}
			})
				.then(res => res.json())
				.then(res => {
					if (res.error) {
						switch (res.error.status) {
							case 403: {
								alert("Sorry, because of the limitation's of spotify's api, only premium users can host with crowd.");
								window.location.href = "/";
								break;
							}
							case 404: {
								alert(
									"It looks like we couldn't find a place to play this song; make sure spotify is open and you're logged in with the same account you used to log in here, then try re-adding your song to the queue."
								);

								break;
							}
							default:
								break;
						}
					}
				});
		case types.RESUME:
			return fetch(`${SPOTIFY_API_BASE}/me/player/play`, {
				method: "PUT",
				headers: {
					Authorization: "Bearer " + store.getState().session.host_token
				}
			})
				.then(res => res.json())
				.then(res => {
					if (res.error) {
						switch (res.error.status) {
							case 401: {
								alert("Invalid Access token. Try recreating room.");
								window.location.href = "/";
								break;
							}
							case 403: {
								alert("Sorry, because of the limitation's of spotify's api, only premium users can host with crowd.");
								window.location.href = "/";
								break;
							}
							case 404: {
								alert(
									"It looks like we couldn't find a place to play this song; make sure spotify is open and you're logged in with the same account you used to log in here, then press the play button."
								);
								store.dispatch(clear());
								break;
							}
							default:
								break;
						}
					}
				});
		default:
			break;
	}

	return result;
};
