const Router = require("express").Router;
const Queue = require("./queue");

var globalSocket = null;

var rooms = {};
var socketRooms = {
	//Socket ID : group ID
};

var generateRandomString = function(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const exportedApi = function(io, spotifyApi) {
	let api = Router();

	api.get("/queue/:group", (req, res) => {
		const { group } = req.params;
		//get queue for given group
		res.json(rooms[group].queue.getTrackQueue());
	});

	api.get("/nowPlaying/:group", (req, res) => {
		const { group } = req.params;
		//get queue for given group
		res.json(rooms[group].queue.getNowPlaying());
	});

	// websocket connection
	io.on("connection", function(socket) {
		// for all socket messages from redux/socket.io
		socket.on("queueTrack", (trackId, group, userId, name) => {
			//using track id, get all info about track from spotify
			spotifyApi.getTrack(trackId).then(
				function(data) {
					console.log("adding track to " + group + " queue: " + data.body.name);
					//add to group queue
					rooms[group].queue.enqueue({
						track: data.body,
						voters: {
							positive: [userId],
							negative: [],
							value: 1
						},
						enqueueTime: new Date(),
						id: generateRandomString(10),
						user: name
					});
					// tell all users in group to update queue
					io.to(group).emit("updateQueue");
				},
				function(err) {
					console.error(err);
				}
			);
		});

		socket.on("groupJoin", (data, isHost) => {
			if (!data) {
				return;
			}

			// if user is host
			if (isHost) {
				if (rooms[data]) {
					console.log(data, "host reconnect");
					rooms[data].host = socket.id;
				} else {
					//Set user to host of new group
					rooms[data] = {
						host: socket.id,
						queue: new Queue({
							onPlay: () => {
								const { track } = rooms[data].queue.getNowPlaying();
								// if there is a host, emit to only that host
								rooms[data] && io.to(rooms[data].host).emit("play track", track);
								rooms[data] && io.to(data).emit("updateNowPlaying");
							},
							onVote: () => {
								rooms[data] && io.to(data).emit("updateQueue");
							},
							onQueueEmpty: () => {
								rooms[data] && io.to(data).emit("updateNowPlaying");
								// delete room if no more host
								if (rooms[data].host == null) {
									delete rooms[data];
									console.log("deleting room", data);
								}
							}
						})
					};
					console.log("Creating Queue for group " + data);
				}
			} else {
				if (!rooms[data]) {
					console.log("room doesn't exist");
					socket.emit("room error", "room doesn't exist", true);
					return;
				}
			}
			console.log("socket", socket.id, "is joining room", data);
			socket.join(data);
			socketRooms[socket.id] = data;
			// Now that they're in the group, have them update their local queue
			// socket.emit("updateQueue");
			socket.emit("updateNowPlaying");
		});

		socket.on("voteUp", (trackIndex, group, user_id) => {
			rooms[group].queue.voteUp(trackIndex, user_id);
			console.dir(socket.rooms);
		});

		socket.on("voteDown", (trackIndex, group, user_id) => {
			rooms[group].queue.voteDown(trackIndex, user_id);
		});

		socket.on("voteNeutral", (trackIndex, group, user_id) => {
			rooms[group].queue.voteNeutral(trackIndex, user_id);
		});

		socket.on("pause", group => {
			rooms[group].queue.pauseTimer();
		});

		socket.on("resume", group => {
			rooms[group].queue.resumeTimer();
		});

		socket.on("skip", group => {
			rooms[group].queue.play();
		});

		socket.on("disconnect", function() {
			// if user is host of group, set group host to null
			let group = socketRooms[socket.id];
			if (group) {
				if (rooms[group].host == socket.id) {
					rooms[group].host = null;
				}

				//delete user from socketRooms
				delete socketRooms[socket.id];
			}
		});
	});

	return api;
};

module.exports = exportedApi;
