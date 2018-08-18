import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import sessionReducer from "./sessionReducer";
import queueReducer from "./queueReducer";
import playbackReducer from "./playbackReducer";
import nowPlayingReducer from "./nowPlayingReducer";

export default combineReducers({
	search: searchReducer,
	session: sessionReducer,
	queue: queueReducer,
	playback: playbackReducer,
	nowPlaying: nowPlayingReducer
});
