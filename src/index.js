import React from "react";
import { hydrate, render } from "react-dom";
import Router from "./BrowserRouter";
import "./css/style.scss";
import * as Sentry from "@sentry/browser";

Sentry.init({
	dsn: "https://800ac4dbef6c44bcb65af9fddad9f964@sentry.io/1490082"
});

// import registerServiceWorker from "./utils/ServiceWorker";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
	hydrate(<Router />, rootElement);
} else {
	render(<Router />, rootElement);
}

// registerServiceWorker();
