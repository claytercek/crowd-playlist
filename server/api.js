const Router = require("express").Router;
const Queue = require("./queue");
const SpotifyWebApi = require("spotify-web-api-node");
const AuthConfig = require("../config/auth");

const spotifyApi = new SpotifyWebApi({
	clientId: AuthConfig.CLIENT_ID,
	clientSecret: AuthConfig.CLIENT_SECRET
});

var accessToken = null;
var expires_in = null;

const fetchNewToken = async callback => {
	console.log("Fetching new token");
	await spotifyApi
		.clientCredentialsGrant()
		.then(data => {
			accessToken = data.body["access_token"];
			expires_in = data.body["expires_in"];
			spotifyApi.setAccessToken(accessToken);
			callback && callback(accessToken);
			setTimeout(() => {
				fetchNewToken();
			}, (expires_in - 10 * 60) * 1000); // refresh it in expires_in - 10 min
		})
		.catch(e => {
			console.error("fetchNewToken > Error fetching new token", e);
		});
};

// returns a new token or the cached one if still valid
const getToken = async callback => {
	if (accessToken !== null) {
		callback && callback(accessToken);
	} else {
		await fetchNewToken(callback);
	}
};

const exportedApi = function(io, spotifyApi) {
	const queue = new Queue(io, spotifyApi);

	let api = Router();

	api.get("/token", async (req, res) => {
		await getToken();
		try {
			res.json({ access_token: accessToken, expires_in: expires_in });
		} catch (e) {
			console.log("error", e);
			res.status(500);
		}
	});

	api.get("/queue", (req, res) => {
		res.json(queue.getTrackQueue());
	});

	io.on("connection", function(socket) {
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
