import React, { Component } from "react";
import QueueItem from "./queueItem";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import "../static/css/queueStyles.css";

class Queue extends Component {
	render() {
		return (
			<FlipMove typeName="ul" className="Queue">
				<div className="QueueHeader">
					<h2 className="title">track</h2>
					<h3 className="artist">artist</h3>
					<h3 className="album">album</h3>
					<h3 className="length">length</h3>
					<div className="voteSpace" />
				</div>
				{this.props.items.length > 0 && this.props.items.map((track, index) => <QueueItem key={track.id} index={index} voters={track.voters} track={track.track} />)}
			</FlipMove>
		);
	}
}

const mapStateToProps = state => ({
	items: state.queue
});

export default connect(mapStateToProps)(Queue);
