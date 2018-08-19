import React, { Component } from "react";
import Queue from "../components/queue";
import NowPlaying from "../components/nowPlaying";
import Search from "../components/search";
import { groupJoin } from "../actions/sessionActions";
import { connect } from "react-redux";

class Guest extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		console.log(id);
		//update group in local state
		this.props.groupJoin(id);
		//make sure server knows you are in group
		this.props.socketJoinGroup(id);
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
				<Search />
				<NowPlaying track={nowPlaying.track} user={nowPlaying.user} />
				<Queue />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => ({
	groupJoin: id => dispatch(groupJoin(id)),
	socketJoinGroup: id => dispatch({ type: "socket/group", data: id, isHost: false })
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Guest);
