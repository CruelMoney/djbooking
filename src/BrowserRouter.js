/* eslint-disable import/first */
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./App";
import store from "./store";
import { HelmetProvider } from "react-helmet-async";

import "./polyfills";

const theme = getMuiTheme();

class MyRouter extends Component {
	render() {
		return (
			<Router>
				<MuiThemeProvider muiTheme={theme}>
					<HelmetProvider>
						<App />
					</HelmetProvider>
				</MuiThemeProvider>
			</Router>
		);
	}
}

export default props => (
	<Provider store={store}>
		<MyRouter {...props} />
	</Provider>
);
