import React, { Component } from "react";
import Connect from "./pages/connect";
import Guest from "./pages/guest";
import Host from "./pages/host";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Connect} />
					<Route path="/host/:id/:access_token" component={Host} />
					<Route path="/guest/:id/:name" component={Guest} />
				</Switch>
			</Router>
		);
	}
}
export default App;
