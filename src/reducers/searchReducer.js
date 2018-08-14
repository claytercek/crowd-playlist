import { SEARCH_TRACKS, SEARCH_TRACKS_RESET, SEARCH_TRACKS_SUCCESS } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_TRACKS:
			return { query: action.query };
		case SEARCH_TRACKS_RESET:
			return initialState;
		case SEARCH_TRACKS_SUCCESS:
			if (state.query === action.query) {
				return {
					query: action.query,
					results: action.results
				};
			} else {
				return state;
			}
		default:
			return state;
	}
};
