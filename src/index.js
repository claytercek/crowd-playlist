import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
// service worker causes dev bugs

import { Provider } from "react-redux";
import { initStore } from "./store";

const store = initStore();

// store.dispatch(fetchQueue());
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// registerServiceWorker();
