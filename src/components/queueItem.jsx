import React, { Component } from "react";

function msToTime(s) {
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;

	return mins + ":" + secs;
}

export default class QueueItem extends Component {
	render() {
		const title = this.props.track.name;
		const artist = this.props.track.artists[0].name;
		const album = this.props.track.album.name;
		const length = this.props.track.duration_ms;
		return (
			<li>
				<p className="title">{title}</p>
				<p className="artist">{artist}</p>
				<p className="album">{album}</p>
				<p className="length">{msToTime(length)}</p>
			</li>
		);
	}
}
