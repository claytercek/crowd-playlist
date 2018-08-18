import { PLAY_TRACK_SUCCESS } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case PLAY_TRACK_SUCCESS:
			return action.track;
		default:
			return state;
	}
};
