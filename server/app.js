import { createReactAppExpress } from "@cra-express/core";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { HelmetProvider } from "react-helmet-async";
import App from "../src/App";
import resolvers from "../src/actions/resolvers";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import cookieParser from "cookie-parser";
import express from "express";

require("dotenv");
const path = require("path");
const { renderToString } = require("react-dom/server");
const React = require("react");
const { Provider } = require("react-redux");
const { StaticRouter } = require("react-router");
const { configureStore } = require("../src/store");
const getMuiTheme = require("material-ui/styles/getMuiTheme").default;
const MuiThemeProvider = require("material-ui/styles/MuiThemeProvider").default;

const clientBuildPath = path.resolve(__dirname, "../client");
let tag = "";

const getReactApp = async (req, res) => {
	const { store, sheet } = res.locals;
	const context = { store };

	const theme = getMuiTheme({
		userAgent: req.headers["user-agent"]
	});

	const client = new ApolloClient({
		ssrMode: true,
		link: createHttpLink({
			uri: process.env.REACT_APP_CUEUP_GQL_DOMAIN,
			credentials: "include",
			headers: {
				"x-token": req.cookies["x-token"] // forward token
			}
		}),
		cache: new InMemoryCache(),
		resolvers
	});

	const Content = (
		<ApolloProvider client={client}>
			<StyleSheetManager sheet={sheet.instance}>
				<Provider store={store}>
					<StaticRouter location={req.url} context={context}>
						<MuiThemeProvider muiTheme={theme}>
							<HelmetProvider context={res.locals.helmetContext}>
								<App />
							</HelmetProvider>
						</MuiThemeProvider>
					</StaticRouter>
				</Provider>
			</StyleSheetManager>
		</ApolloProvider>
	);

	await getDataFromTree(Content);

	res.locals.apolloState = client.extract();

	return Content;
};

const parseCookies = async (req, res) => {
	return new Promise((resolve, reject) => {
		cookieParser()(req, res, error => {
			if (error) {
				return reject(error);
			}
			return resolve();
		});
	});
};

const handleUniversalRender = async (req, res) => {
	try {
		await parseCookies(req, res);

		const store = configureStore({}, req);
		const sheet = new ServerStyleSheet();

		res.locals.store = store;
		res.locals.helmetContext = {};
		res.locals.sheet = sheet;

		const app = await getReactApp(req, res);
		renderToString(app);

		return app;
	} catch (error) {
		console.log(error);
		return res.json("Something went wrong");
	}
};

const app = createReactAppExpress({
	clientBuildPath,
	universalRender: handleUniversalRender,
	onFinish(req, res, html) {
		const { apolloState, store, helmetContext, sheet } = res.locals;
		const state = store.getState();
		const { helmet } = helmetContext;
		const helmetTitle = helmet.title.toString();
		const helmetMeta = helmet.meta.toString();
		const styleTags = sheet.getStyleTags();
		sheet.seal();

		const newHtml = html
			.replace("</head>", helmetTitle + "</head>")
			.replace("</head>", helmetMeta + "</head>")
			.replace("</head>", styleTags + "</head>")
			.replace(
				'"%PRELOADED_STATE%"',
				JSON.stringify(state).replace(/</g, "\\u003c")
			)
			.replace(
				'"%PRELOADED_APOLLO_STATE%"',
				JSON.stringify(apolloState).replace(/</g, "\\u003c")
			);

		res.send(newHtml);
	},
	onEndReplace(html) {
		return html;
	}
});

if (module.hot) {
	module.hot.accept("../src/App", () => {
		const { default: App } = require("../src/App");
		console.log("✅ Server hot reloaded App");
	});
}

export default app;
