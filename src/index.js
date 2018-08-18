import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { initStore } from "./store";

// import registerServiceWorker from "./registerServiceWorker";
// service worker causes dev bugs

const store = initStore();

// store.dispatch(fetchQueue());
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// registerServiceWorker();
