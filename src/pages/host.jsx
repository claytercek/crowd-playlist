import React, { Component } from "react";
import Queue from "../components/queue";
import NowPlaying from "../components/nowPlaying";
import Search from "../components/search";
import "../styles/AppStyles.css";
import { groupJoin, setHostToken } from "../actions/sessionActions";
import { connect } from "react-redux";

class Host extends Component {
	componentDidMount() {
		const { id, access_token } = this.props.match.params;
		console.log(id, access_token);

		this.props.setHostToken(access_token);
		//update group in local state
		this.props.groupJoin(id);
	}

	render() {
		return (
			<div>
				<h1>{}</h1>
				<Search />
				<NowPlaying />
				<Queue />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => ({
	groupJoin: id => dispatch(groupJoin(id, true)),
	setHostToken: token => dispatch(setHostToken(token))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Host);
