import { QUEUE_TRACK, GROUP_JOIN, VOTE_UP, VOTE_DOWN, VOTE_NEUTRAL } from "../actions/actionTypes";
import { fetchQueue, fetchNowPlaying } from "../actions/queueActions";
import { playTrack } from "../actions/playbackActions";
import { apiUrl } from "../constants/constants";
import io from "socket.io-client";
import { groupJoin } from "../actions/sessionActions";

var socket = null;

export function socketMiddleware(store) {
	return next => action => {
		const result = next(action);
		const session = store.getState().session;

		if (socket) {
			switch (action.type) {
				case QUEUE_TRACK: {
					socket.emit("queueTrack", action.id, session.group, session.user_id, session.name);
					break;
				}
				case VOTE_UP: {
					socket.emit("voteUp", action.trackIndex, session.group, session.user_id);
					break;
				}
				case VOTE_DOWN: {
					socket.emit("voteDown", action.trackIndex, session.group, session.user_id);
					break;
				}
				case VOTE_NEUTRAL: {
					socket.emit("voteNeutral", action.trackIndex, session.group, session.user_id);
					break;
				}
				case GROUP_JOIN: {
					socket.emit("groupJoin", action.groupID, action.isHost);
					break;
				}
				default:
					break;
			}
		}

		return result;
	};
}
export default function(store) {
	socket = io.connect(
		apiUrl,
		{ "reconnection limit": 500, "max reconnection attempts": Number.MAX_VALUE, "connect timeout": 7000 }
	);

	socket.on("reconnect", () => {
		var groupId = store.getState().session.group;
		var isHost = store.getState().session.host_token != null ? true : false;
		socket.emit("groupJoin", groupId, isHost);
	});

	socket.on("updateQueue", () => {
		console.log("fetching queue");
		store.dispatch(fetchQueue());
	});

	socket.on("updateNowPlaying", () => {
		store.dispatch(fetchQueue());
		store.dispatch(fetchNowPlaying());
	});

	socket.on("play track", track => {
		store.dispatch(playTrack(track));
	});

	// todo: manage end song, end queue
}
