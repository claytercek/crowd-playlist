import React, { Component } from "react";
import QueueItem from "./queueItem";
import { connect } from "react-redux";
import "../styles/queueStyles.css";

class Queue extends Component {
	render() {
		return (
			<div className="Queue">
				<div className="lable">
					<p className="title">title</p>
					<p className="artist">artist</p>
					<p className="album">album</p>
					<p className="length">length</p>
				</div>
				<ul>{this.props.items.length > 0 && this.props.items.map(track => <QueueItem key={track.track.id} track={track.track} />)}</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	items: state.queue
});

export default connect(mapStateToProps)(Queue);
