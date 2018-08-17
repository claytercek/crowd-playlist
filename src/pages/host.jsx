import React, { Component } from "react";
import Queue from "../components/queue";
import NowPlaying from "../components/nowPlaying";
import Search from "../components/search";
import "../styles/AppStyles.css";
import { groupJoin } from "../actions/sessionActions";
import { connect } from "react-redux";

class Host extends Component {
	componentDidMount() {
		const { id, access_token } = this.props.match.params;
		console.log(id, access_token);
		//TODO: update state with user access_token and indication of host

		//update group in local state
		this.props.groupJoin(id);
		//make sure server knows you are in group
		this.props.socketJoinGroup(id);
	}

	render() {
		//dummy content, to be replaced
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
				<h1>{}</h1>
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
	socketJoinGroup: id => dispatch({ type: "socket/group", data: id, isHost: true })
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Host);
