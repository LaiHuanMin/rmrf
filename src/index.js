import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Router, hashHistory as history } from "react-router";
import routes from "@route/index.js";
import "milligram";
import "./index.css";

ReactDOM.render(
  <Router routes={routes} history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
