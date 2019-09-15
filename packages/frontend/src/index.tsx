import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import App from "./App";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWares = applyMiddleware(thunk);

const store = createStore(rootReducer, composeWithDevTools(middleWares));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
