import React, { Component } from "react";
import Queue from "./components/queue";
import NowPlaying from "./components/nowPlaying";
import Search from "./components/search";
import "./styles/AppStyles.css";

class App extends Component {
	render() {
		var items = [
			{
				title: "Name One",
				artist: "Artist One",
				album: "Album One",
				length: "2:00"
			},
			{
				title: "Name Two",
				artist: "Artist Two",
				album: "Album Two",
				length: "2:00"
			},
			{
				title: "Name Three",
				artist: "Artist Three",
				album: "Album Three",
				length: "2:00"
			},
			{
				title: "Name Four",
				artist: "Artist Four",
				album: "Album Four",
				length: "2:00"
			}
		];

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
				<Search />
				<NowPlaying track={nowPlaying.track} user={nowPlaying.user} />
				<Queue items={items} />
			</div>
		);
	}
}

export default App;
