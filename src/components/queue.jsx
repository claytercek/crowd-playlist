import React, { Component } from "react";
import QueueItem from "./queueItem";
import { connect } from "react-redux";
import "../static/css/queueStyles.css";

class Queue extends Component {
	render() {
		return <ul className="Queue">{this.props.items.length > 0 && this.props.items.map((track, index) => <QueueItem key={index} index={index} voters={track.voters} track={track.track} />)}</ul>;
	}
}

const mapStateToProps = state => ({
	items: state.queue
});

export default connect(mapStateToProps)(Queue);
