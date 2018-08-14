const Router = require("express").Router;
var SpotifyWebApi = require("spotify-web-api-node");
const AppConfig = require("../config/app");
const AuthConfig = require("../config/auth");

var state = "some-state-of-my-choice";
var spotifyApi = new SpotifyWebApi({
	clientId: AuthConfig.CLIENT_ID,
	clientSecret: AuthConfig.CLIENT_SECRET,
	redirectUri: `${AppConfig.HOST}/auth/callback`
});
var scopes = ["user-read-private", "user-read-email", "user-read-playback-state", "user-modify-playback-state"];
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

let auth = Router();

auth.get("/login", function(req, res) {
	res.redirect(authorizeURL);
});

/* Handle authorization callback from Spotify */
auth.get("/callback", function(req, res) {
	/* Read query parameters */
	var code = req.query.code; // Read the authorization code from the query parameters

	/* Get the access token! */
	spotifyApi
		.authorizationCodeGrant(code)
		.then(
			function(data) {
				const { access_token } = data.body;
				spotifyApi.setAccessToken(access_token);
				console.log("The access token is " + access_token);

				/* Redirecting back to the main page! :-) */
				res.redirect("/");
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
