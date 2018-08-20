import { UPDATE_TOKEN_SUCCESS, GROUP_JOIN, SET_HOST_TOKEN, SET_NAME } from "../actions/actionTypes";

const initialState = {
	expires_in: null,
	access_token: null,
	group: null
};

var generateRandomString = function(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_TOKEN_SUCCESS:
			return Object.assign({}, state, { access_token: action.access_token, expires_in: action.expires_in });
		case GROUP_JOIN:
			return Object.assign({}, state, { group: action.groupID });
		case SET_HOST_TOKEN:
			return Object.assign({}, state, { host_token: action.token });
		case SET_NAME:
			return Object.assign({}, state, { user_id: generateRandomString(10), name: action.name });
		default:
			return state;
	}
};
