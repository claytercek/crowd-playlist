import React, { Component } from "react";
import "../styles/AppStyles.css";
import { Link } from "react-router-dom";
import { apiUrl } from "../constants/constants";

export default class Connect extends Component {
	constructor() {
		super();
		this.state = {
			inputValue: ""
		};
	}

	login() {
		window.location = apiUrl + "/auth/login";
	}

	updateInputValue = e => {
		this.setState({
			inputValue: e.target.value
		});
	};

	render() {
		return (
			<div className="connect">
				<button onClick={this.login}>Create Group</button>
				<br />
				<input type="text" onChange={this.updateInputValue} />
				<Link to={`guest/${this.state.inputValue}`}>
					<button>Connect to Existing Group</button>
				</Link>
			</div>
		);
	}
}