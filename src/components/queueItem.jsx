import React, { Component } from "react";
import { connect } from "react-redux";
import { voteUp, voteDown, voteNeutral } from "../actions/voteActions";

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
	constructor(props) {
		super(props);
		this.upClick = this.upClick.bind(this);
		this.downClick = this.downClick.bind(this);
	}

	upClick() {
		const userId = this.props.userId;
		const positive = this.props.voters.positive;

		if (positive.includes(userId)) {
			this.props.voteNeutral(this.props.index);
		} else {
			this.props.voteUp(this.props.index);
		}
	}

	downClick() {
		const userId = this.props.userId;
		const negative = this.props.voters.negative;

		if (negative.includes(userId)) {
			this.props.voteNeutral(this.props.index);
		} else {
			this.props.voteDown(this.props.index);
		}
	}

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
				<img src={upIcon} alt="vote Up" onClick={this.upClick} />
				<p>{votes}</p>
				<img src={downIcon} alt="vote Down" onClick={this.downClick} />
			</div>
		);
	}
}

export class QueueItem extends Component {
	render() {
		const title = this.props.track.name;
		const artist = this.props.track.artists[0].name;
		const album = this.props.track.album.name;
		const length = this.props.track.duration_ms;
		return (
			<li>
				<h2 className="title">{title}</h2>
				<h3 className="artist">{artist}</h3>
				<h3 className="album">{album}</h3>
				<h3 className="length">{msToTime(length)}</h3>
				<Vote index={this.props.index} userId={this.props.user_id} voters={this.props.voters} voteUp={this.props.voteUp} voteDown={this.props.voteDown} voteNeutral={this.props.voteNeutral} />
			</li>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	voteNeutral: trackIndex => dispatch(voteNeutral(trackIndex)),
	voteUp: trackIndex => dispatch(voteUp(trackIndex)),
	voteDown: trackIndex => dispatch(voteDown(trackIndex))
});

const mapStateToProps = state => ({
	user_id: state.session.user_id
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QueueItem);
