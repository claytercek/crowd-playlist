const Router = require("express").Router;
const Queue = require("./queue");

globalSocket = null;

queueContainer = {};
hostContainer = {};

const exportedApi = function(io, spotifyApi) {
	let api = Router();

	api.get("/queue/:group", (req, res) => {
		const { group } = req.params;
		//get queue for given group
		res.json(queueContainer[group].getTrackQueue());
	});

	api.get("/nowPlaying/:group", (req, res) => {
		const { group } = req.params;
		//get queue for given group
		res.json(queueContainer[group].getNowPlaying());
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
					queueContainer[group].enqueue({
						track: data.body,
						voters: {
							positive: [userId],
							negative: [],
							value: 1
						},
						enqueueTime: new Date()
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
			console.log("socket", socket.id, "is joining room", data);
			// if user is host
			if (isHost) {
				//Set user to host of new group
				hostContainer[data] = socket.id;
				//Create new instance of queue object
				queueContainer[data] = new Queue({
					onPlay: () => {
						const { track } = queueContainer[data].getNowPlaying();
						// if there is a host, emit to only that host
						hostContainer[data] && io.to(hostContainer[data]).emit("play track", track);
						hostContainer[data] && io.to(data).emit("updateNowPlaying");
					},
					onVote: () => {
						hostContainer[data] && io.to(data).emit("updateQueue");
					}
				});
				console.log("Creating Queue for group " + data);
			}
			socket.join(data);
			// Now that they're in the group, have them update their local queue
			// socket.emit("updateQueue");
			socket.emit("updateNowPlaying");
		});

		socket.on("voteUp", (trackIndex, group, user_id) => {
			queueContainer[group].voteUp(trackIndex, user_id);
		});

		socket.on("voteDown", (trackIndex, group, user_id) => {
			queueContainer[group].voteDown(trackIndex, user_id);
		});

		socket.on("voteNeutral", (trackIndex, group, user_id) => {
			console.log(trackIndex, group, user_id);
			queueContainer[group].voteNeutral(trackIndex, user_id);
		});

		//TODO: handle socket disconnections: delete queue if host disconnects, force out all users  in that group
	});

	return api;
};

module.exports = exportedApi;
