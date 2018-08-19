const Router = require("express").Router;
var SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config({ path: ".env.local" });

var spotifyApi = new SpotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.CALLBACK
});

var accessToken = null;
var expires_in = null;

const fetchNewToken = async callback => {
	console.log("Fetching new client credentials token");
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

/**
 * Generates a random string of length n containing uppercase letters
 */
var generateRandomString = function(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

let auth = Router();

auth.get("/token", async (req, res) => {
	await getToken();
	try {
		res.json({ access_token: accessToken, expires_in: expires_in });
	} catch (e) {
		console.log("error", e);
		res.status(500);
	}
});

auth.get("/login", function(req, res) {
	console.log("login get request");
	var scopes = ["user-read-playback-state", "user-modify-playback-state"];
	var state = generateRandomString(4);
	var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
	console.log("authorizing new host user");
	res.redirect(authorizeURL);
});

/* Handle authorization callback from Spotify */
auth.get("/callback", function(req, res) {
	/* Read query parameters */
	var code = req.query.code; // Read the authorization code from the query parameters
	var state = req.query.state;
	/* Get the access token! */
	spotifyApi
		.authorizationCodeGrant(code)
		.then(
			function(data) {
				const { access_token } = data.body;

				// spotifyApi.setAccessToken(access_token);

				/* Redirecting back to the main page and include hash parameters*/
				console.log("NODE_ENV", process.env.NODE_ENV);
				res.redirect("/host/" + state + "/" + access_token);
			},
			function(err) {
				res.status(err.code);
				res.send(err.message);
			}
		)
		.catch(function(error) {
			console.error(error);
		});
});

module.exports = { auth, spotifyApi };
