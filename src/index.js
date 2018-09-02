import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { initStore } from "./store";
import "./static/css/main.css";
import "./static/css/fonts.css";

// import registerServiceWorker from "./registerServiceWorker";
// service worker causes dev bugs

const store = initStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// registerServiceWorker();
