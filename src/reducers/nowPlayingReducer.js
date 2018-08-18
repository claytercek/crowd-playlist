import { FETCH_NOW_PLAYING_SUCCESS } from "../actions/actionTypes";

const initialState = {
	track: null,
	user: null,
	startTimestamp: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NOW_PLAYING_SUCCESS:
			return action.data;
		default:
			return state;
	}
};
