import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { updateToken } from "./actions/sessionActions";
import { fetchQueue } from "./actions/queueActions";
import thunk from "redux-thunk";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
let socket = io("http://localhost:3001");
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, socketIoMiddleware)));
store.dispatch(updateToken());
store.dispatch(fetchQueue());
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

socket.on("updateQueue", () => {
	store.dispatch(fetchQueue());
});

registerServiceWorker();
