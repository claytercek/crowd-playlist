import React, { Component } from "react";
// import "../styles/nowPlayingStyles.css";
import { connect } from "react-redux";

class NowPlaying extends Component {
	render() {
		return (
			(this.props.track && (
				<div className="NowPlaying">
					<h2>{this.props.track.name}</h2>
					<h3>{this.props.track.artists[0].name}</h3>
					<h3>{this.props.track.album.name}</h3>
					<img src={this.props.track.album.images[1].url} alt={this.props.track.album.name} />
				</div>
			)) || (
				<div className="NowPlaying">
					<h2>No tracks queued</h2>
				</div>
			)
		);
	}
}

const mapStateToProps = state => ({
	track: state.nowPlaying.track,
	user: state.nowPlaying.user,
	startTimestamp: state.nowPlaying.startTimestamp
});

export default connect(mapStateToProps)(NowPlaying);
