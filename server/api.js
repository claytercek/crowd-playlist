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

	// websocket connection
	io.on("connection", function(socket) {
		// for all socket messages from redux/socket.io
		socket.on("action", action => {
			switch (action.type) {
				//user sending track id
				case "socket/queueTrack":
					let trackId = action.data;

					//using track id, get all info about track from spotify
					spotifyApi.getTrack(trackId).then(
						function(data) {
							console.log("adding track to " + action.group + " queue: " + data.body.name);
							//add to group queue
							queueContainer[action.group].enqueue({
								track: data.body
							});

							// tell all users in group to update queue
							io.to(action.group).emit("updateQueue");
						},
						function(err) {
							console.error(err);
						}
					);
					break;
				case "socket/group":
					console.log("socket", socket.id, "is joining room", action.data);

					// if user is host
					if (action.isHost) {
						//Set user to host of new group
						hostContainer[action.data] = socket.id;
						//Create new instance of queue object
						queueContainer[action.data] = new Queue({
							onPlay: () => {
								//TODO: get latest track, and emit "play" to host user
							}
						});
						console.log("Creating Queue for group " + action.data);
					}
					socket.join(action.data);
					// Now that they're in the group, have them update their local queue
					socket.emit("updateQueue");
					break;
			}
		});
	});

	return api;
};

module.exports = exportedApi;
