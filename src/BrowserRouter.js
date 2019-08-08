/* eslint-disable import/first */
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./App";
import store from "./store";
import { HelmetProvider } from "react-helmet-async";
import ReactModal from "react-modal";
import ApolloProvider from "./ApolloProvider";
import "./polyfills";

const theme = getMuiTheme();

ReactModal.setAppElement("#root");

class MyRouter extends Component {
	render() {
		return (
			<ApolloProvider>
				<Router>
					<MuiThemeProvider muiTheme={theme}>
						<HelmetProvider>
							<App />
						</HelmetProvider>
					</MuiThemeProvider>
				</Router>
			</ApolloProvider>
		);
	}
}

export default props => (
	<Provider store={store}>
		<MyRouter {...props} />
	</Provider>
);
