import React, { Component } from "react";
import config from "../config/app";

export default class Connect extends Component {
	render() {
		return (
			<div className="connect">
				<a href={config.HOST}>
					<button>Create Group</button>
				</a>
				<button>Connect to Existing Group</button>
			</div>
		);
	}
}
