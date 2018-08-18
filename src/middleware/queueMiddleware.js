import * as types from "../actions/actionTypes";
import fetch from "cross-fetch";
import Config from "../config/app";

import { fetchQueueSuccess, fetchNowPlayingSuccess } from "../actions/queueActions";

export default store => next => action => {
	const result = next(action);
	switch (action.type) {
		case types.FETCH_QUEUE:
			fetch(`${Config.HOST}/api/queue/` + store.getState().session.group)
				.then(res => res.json())
				.then(res => {
					store.dispatch(fetchQueueSuccess(res));
				})
				.catch(err => console.log(err));
			break;
		case types.FETCH_NOW_PLAYING:
			fetch(`${Config.HOST}/api/nowPlaying/` + store.getState().session.group)
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
