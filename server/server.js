const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { auth, spotifyApi } = require("./authorization");
const api = require("./api");
const bodyParser = require("body-parser");

app.use(
	bodyParser.json({
		limit: 1024
	})
);

// authorization router

app.use(express.static(path.join(__dirname, "../build")));

// auth router
app.use("/auth", auth);

//api router
// pass socket
app.use("/api", api(io, spotifyApi));

server.listen(process.env.PORT || 3001, err => {
	if (err) throw err;
	console.log(`> Ready on http://localhost:${process.env.PORT || 3001}`);
});
