import { QUEUE_TRACK, GROUP_JOIN } from "../actions/actionTypes";
import { fetchQueue } from "../actions/queueActions";
import { playTrack } from "../actions/playbackActions";
import Config from "../config/app";

import io from "socket.io-client";

var socket = null;

export function socketMiddleware(store) {
	return next => action => {
		const result = next(action);

		if (socket) {
			switch (action.type) {
				case QUEUE_TRACK: {
					socket.emit("queueTrack", action.id, store.getState().session.group);
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
	socket = io.connect(Config.HOST);

	socket.on("updateQueue", () => {
		store.dispatch(fetchQueue());
	});

	socket.on("play track", track => {
		store.dispatch(playTrack(track));
	});

	// todo: manage end song, end queue
}
