const Router = require("express").Router;
var SpotifyWebApi = require("spotify-web-api-node");
const AppConfig = require("../src/config/app");
const AuthConfig = require("../src/config/auth");
var querystring = require("querystring");

var spotifyApi = new SpotifyWebApi({
	clientId: AuthConfig.CLIENT_ID,
	clientSecret: AuthConfig.CLIENT_SECRET,
	redirectUri: `${AppConfig.HOST}/auth/callback`
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
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

auth.get("/login", function(req, res) {
	var scopes = ["user-read-playback-state", "user-modify-playback-state"];
	var state = generateRandomString(4);
	var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
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

				/* Redirecting back to the main page and include hash parameters*/
				res.redirect(
					"/#" +
						querystring.stringify({
							access_token: access_token,
							state: state
						})
				);
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
