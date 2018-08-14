import { QUEUE_UPDATE_LOCAL } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case QUEUE_UPDATE_LOCAL:
			return action.data;
		default:
			return state;
	}
};
