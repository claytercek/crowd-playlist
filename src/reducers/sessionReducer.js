import { UPDATE_TOKEN_SUCCESS } from "../actions/actionTypes";

const initialState = {
	expires_in: null,
	access_token: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_TOKEN_SUCCESS:
			return Object.assign({}, state, { access_token: action.access_token, expires_in: action.expires_in });
		default:
			return state;
	}
};
