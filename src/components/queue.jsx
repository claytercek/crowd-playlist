import React, { Component } from "react";
import QueueItem from "./queueItem";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import "../static/css/queueStyles.css";

class Queue extends Component {
	render() {
		return (
			<FlipMove typeName="ul" className="Queue">
				{this.props.items.length > 0 && this.props.items.map((track, index) => <QueueItem key={track.id} index={index} voters={track.voters} track={track.track} />)}
			</FlipMove>
		);
	}
}

const mapStateToProps = state => ({
	items: state.queue
});

export default connect(mapStateToProps)(Queue);
