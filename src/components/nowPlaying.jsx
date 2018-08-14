import React, { Component } from "react";
import "../styles/nowPlayingStyles.css";

class NowPlaying extends Component {
	render() {
		return (
			<div className="NowPlaying">
				<h2>{this.props.track.title}</h2>
				<h3>{this.props.track.artist}</h3>
				<h3>{this.props.track.album}</h3>
			</div>
		);
	}
}

export default NowPlaying;
