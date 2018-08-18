import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import playbackMiddleware from "./middleware/playbackMiddleware";
import searchMiddleware from "./middleware/searchMiddleware";
import queueMiddleware from "./middleware/queueMiddleware";
import { socketMiddleware } from "./middleware/socketMiddleware";
import socketMiddlewareDefault from "./middleware/socketMiddleware";
import { updateToken } from "./actions/sessionActions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initStore = (initialState = {}) => {
	const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, playbackMiddleware, searchMiddleware, queueMiddleware, socketMiddleware)));
	socketMiddlewareDefault(store);
	store.dispatch(updateToken());
	return store;
};
