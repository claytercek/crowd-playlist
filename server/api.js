const Router = require("express").Router;
const Queue = require("./queue");

globalSocket = null;

const queue = new Queue({
	onPlay: () => {
		const { track, user } = queueManager.getPlayingContext();
		globalSocket && globalSocket.emit("play track", track, user);
		globalSocket && globalSocket.broadcast.emit("play track", track, user);
	}
});

const exportedApi = function(io, spotifyApi) {
	let api = Router();

	api.get("/queue", (req, res) => {
		res.json(queue.getTrackQueue());
	});

	io.on("connection", function(socket) {
		globalSocket = socket;
		console.log("Socket connected: " + socket.id);
		socket.on("action", action => {
			switch (action.type) {
				case "server/queueTrack":
					let trackId = action.data;
					spotifyApi.getTrack(trackId).then(
						function(data) {
							console.log("adding track to queue: " + data.body.name);
							queue.enqueue({
								// user: socket.user,
								track: data.body
							});
							io.emit("updateQueue");
						},
						function(err) {
							console.error(err);
						}
					);
			}
		});
	});

	return api;
};

module.exports = exportedApi;
