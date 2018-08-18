import * as types from "../actions/actionTypes";
import fetch from "cross-fetch";
import { apiUrl } from "../constants/constants";

import { fetchQueueSuccess, fetchNowPlayingSuccess } from "../actions/queueActions";

export default store => next => action => {
	const result = next(action);
	switch (action.type) {
		case types.FETCH_QUEUE:
			fetch(apiUrl + `/api/queue/` + store.getState().session.group)
				.then(res => res.json())
				.then(res => {
					store.dispatch(fetchQueueSuccess(res));
				})
				.catch(err => console.log(err));
			break;
		case types.FETCH_NOW_PLAYING:
			fetch(apiUrl + `/api/nowPlaying/` + store.getState().session.group)
				.then(res => res.json())
				.then(res => {
					store.dispatch(fetchNowPlayingSuccess(res));
				})
				.catch(err => console.log(err));
			break;
		default:
			break;
	}

	return result;
};
