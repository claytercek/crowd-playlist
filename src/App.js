import React, { Component } from "react";
import Queue from "./components/queue";
import NowPlaying from "./components/nowPlaying";
import Search from "./components/search";
import Connect from "./components/connect";
import "./styles/AppStyles.css";

class App extends Component {
	constructor() {
		super();
		const params = this.getHashParams();
		console.log(params);
	}

	getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		return hashParams;
	}

	render() {
		var nowPlaying = {
			track: {
				title: "Song Title",
				artist: "Artist Name",
				album: "Album Name"
			},
			user: {
				name: "Clay"
			}
		};

		return (
			<div>
				<Connect />
				<Search />
				<NowPlaying track={nowPlaying.track} user={nowPlaying.user} />
				<Queue />
			</div>
		);
	}
}

export default App;
