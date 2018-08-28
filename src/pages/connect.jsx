import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { apiUrl } from "../constants/constants";
import "../static/css/connect.css";

export default class Connect extends Component {
	constructor() {
		super();
		this.state = {
			groupInput: "",
			nameInput: "",
			formClass: "formHidden",
			formSubmitted: false
		};
	}

	login() {
		window.location = apiUrl + "/auth/login";
	}

	updateGroupInput = e => {
		this.setState({
			groupInput: e.target.value
		});
	};

	updateNameInput = e => {
		this.setState({
			nameInput: e.target.value
		});
	};

	showForm = () => {
		this.setState({
			formClass: ""
		});
	};

	hideForm = e => {
		e.preventDefault();
		this.setState({
			formClass: "formHidden"
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.setState({
			formSubmitted: true
		});
	};

	render() {
		if (this.state.formSubmitted) {
			return <Redirect push to={"/guest/" + this.state.groupInput.toUpperCase() + "/" + this.state.nameInput} />;
		}
		return (
			<div className="connect">
				<div className={"panel " + this.state.formClass}>
					<img src={require("../static/imgs/logo.svg")} alt="logo" />
					<button onClick={this.login}>
						<span>create</span> room
					</button>
					<button onClick={this.showForm}>
						<span>join</span> room
					</button>
					<form className={this.state.formClass} onSubmit={this.handleSubmit}>
						<button onClick={this.hideForm} className="back">
							Back
						</button>
						<label>group id</label>
						<input type="text" pattern="[A-Z]{4}" required onChange={this.updateGroupInput} />
						<label>nickname</label>
						<input type="text" required onChange={this.updateNameInput} />
						<input type="submit" value="enter" />
					</form>
				</div>
				<div className="text">
					<h1>Hi! Welcome to crowd</h1>
					<p>crowd is a website allowing users to collaborate and build a playlist together in real time. Users can add songs to the queue, and vote on them to potentially boost them up to the top. </p>
					<p>
						To start a new room, click <strong>create room</strong> on the left, and then log in with your spotify premium account.
					</p>
					<p>
						To join an already existing room, simply click <strong>join room</strong> on the left, and type in the group id from the host’s screen and a nickname for yourself.
					</p>
					<p>
						This is a personal project by Clay Tercek. Click <strong>here</strong> to learn more.
					</p>
				</div>
				{/* <Link to={`guest/${this.state.groupInput}`}>
				</Link> */}
			</div>
		);
	}
}
