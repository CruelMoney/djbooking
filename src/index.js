import React from "react";
import { hydrate, render } from "react-dom";
import Router from "./BrowserRouter";
import "./css/style.scss";
// import registerServiceWorker from "./utils/ServiceWorker";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
	hydrate(<Router />, rootElement);
} else {
	render(<Router />, rootElement);
}

// registerServiceWorker();
