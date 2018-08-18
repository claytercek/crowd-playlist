const path = require("path");
const express = require("express");
const compression = require("compression");
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
app.use(bodyParser.urlencoded({ extended: false }));

app.use(compression());

app.use(express.static(path.join(__dirname, "../build")));

// auth router
app.use("/auth", auth);

//api router
// pass socket
app.use("/api", api(io, spotifyApi));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT || 3001, err => {
	if (err) throw err;
	console.log(`> Ready on http://localhost:${process.env.PORT || 3001}`);
});

//for nodemon
//otherwise have to run "killall node" to get server working after a crash
process.on("SIGINT", () => {
	console.log("Bye bye!");
	process.exit();
});

process.on("uncaughtException", () => {
	console.log("Bye bye!");
	process.exit();
});
