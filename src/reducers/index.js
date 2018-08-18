import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import sessionReducer from "./sessionReducer";
import queueReducer from "./queueReducer";
import playbackReducer from "./playbackReducer";

export default combineReducers({
	search: searchReducer,
	session: sessionReducer,
	queue: queueReducer,
	playback: playbackReducer
});
