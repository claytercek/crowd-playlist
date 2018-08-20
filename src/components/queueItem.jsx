import React, { Component } from "react";

function msToTime(s) {
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	if (secs < 10) {
		secs = "0" + secs;
	}
	return mins + ":" + secs;
}

class Vote extends Component {
	render() {
		const userId = this.props.userId;
		const votes = this.props.voters.value;
		const positive = this.props.voters.positive;
		const negative = this.props.voters.negative;
		var upIcon = require("../static/imgs/upArrow.svg");
		const upArrowActive = require("../static/imgs/upArrowActive.svg");
		var downIcon = require("../static/imgs/downArrow.svg");
		const downArrowActive = require("../static/imgs/downArrowActive.svg");

		if (positive.includes(userId)) {
			upIcon = upArrowActive;
		}

		if (negative.includes(userId)) {
			downIcon = downArrowActive;
		}

		return (
			<div className="vote">
				<img src={upIcon} alt="vote Up" />
				<p>{votes}</p>
				<img src={downIcon} alt="vote Down" />
			</div>
		);
	}
}

export default class QueueItem extends Component {
	render() {
		const title = this.props.track.name;
		const artist = this.props.track.artists[0].name;
		// const album = this.props.track.album.name;
		// const length = this.props.track.duration_ms;
		return (
			<li>
				<h2 className="title">{title}</h2>
				<h3 className="artist">{artist}</h3>
				{/* <p className="album">{album}</p> */}
				{/* <p className="length">{msToTime(length)}</p> */}
				<Vote voters={{ value: 0, positive: [], negative: [] }} userId="abcd" />
			</li>
		);
	}
}
