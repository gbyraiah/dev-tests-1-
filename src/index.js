import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./redux-store";
import { fetchUserIds } from "./thunks";
import { App } from "./components.jsx";

import "./index.css";

/**
 *
 * App initialization
 *
 */
const rootElement = document.getElementById("root");
store.dispatch(fetchUserIds());
setInterval(() => {
  store.dispatch(fetchUserIds());
}, 15000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
