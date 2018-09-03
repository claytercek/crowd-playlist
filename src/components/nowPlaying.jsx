import React, { Component } from "react";
import "../static/css/nowPlayingStyles.css";
import { connect } from "react-redux";
import { pause, resume, skip } from "../actions/playbackActions";

class NowPlaying extends Component {
	constructor() {
		super();
		this.state = {
			isPaused: false
		};
	}

	render() {
		return (
			(this.props.track && (
				<div className="NowPlaying">
					<div className="wave" />
					{this.props.isHost && (
						<img
							className="icon ff"
							alt="fast forward"
							src={require("../static/imgs/fastforward.svg")}
							onClick={() => {
								this.props.skip();
							}}
						/>
					)}
					{this.props.isHost &&
						!this.state.isPaused && (
							<img
								className="icon pause"
								alt="pause"
								src={require("../static/imgs/pause.svg")}
								onClick={() => {
									this.props.pause();
									this.setState({ isPaused: true });
								}}
							/>
						)}

					{this.props.isHost &&
						this.state.isPaused && (
							<img
								className="icon play"
								alt="play"
								src={require("../static/imgs/play.svg")}
								onClick={() => {
									this.props.resume();
									this.setState({ isPaused: false });
								}}
							/>
						)}
					<div className="trackInfo">
						<h2>{this.props.track.name}</h2>
						<h3>
							{this.props.track.artists[0].name}, added by {this.props.user}
						</h3>
					</div>
					<img className="trackImg" src={this.props.track.album.images[1].url} alt={this.props.track.album.name} />
					<h3>{this.props.group}</h3>
				</div>
			)) || (
				<div className="NowPlaying inactive">
					<div className="wave" />
					<h4>
						group id: <span>{this.props.group}</span>
					</h4>
				</div>
			)
		);
	}
}

const mapStateToProps = state => ({
	track: state.nowPlaying.track,
	user: state.nowPlaying.user,
	startTimestamp: state.nowPlaying.startTimestamp,
	group: state.session.group,
	isHost: state.session.host_token
});

const mapDispatchToProps = dispatch => ({
	pause: () => dispatch(pause()),
	resume: () => dispatch(resume()),
	skip: () => dispatch(skip())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NowPlaying);
