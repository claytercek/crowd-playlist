import React, { Component } from "react";
import Queue from "../components/queue";
import NowPlaying from "../components/nowPlaying";
import Search from "../components/search";
import { groupJoin, setName } from "../actions/sessionActions";
import { connect } from "react-redux";

class Guest extends Component {
	componentDidMount() {
		const { id, name } = this.props.match.params;
		console.log(id);
		//update group in local state
		this.props.groupJoin(id);
		//make sure server knows you are in group
		this.props.setName(name);
	}

	render() {
		return (
			<div className="playlist">
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
	groupJoin: id => dispatch(groupJoin(id)),
	setName: name => dispatch(setName(name))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Guest);
