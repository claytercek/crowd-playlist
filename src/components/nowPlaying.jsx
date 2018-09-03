import React, { Component } from "react";
import "../static/css/nowPlayingStyles.css";
import { connect } from "react-redux";

class NowPlaying extends Component {
	render() {
		return (
			(this.props.track && (
				<div className="NowPlaying">
					<div className="wave" />
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
	group: state.session.group
});

export default connect(mapStateToProps)(NowPlaying);
