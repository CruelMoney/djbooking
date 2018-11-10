import { createReactAppExpress } from "@cra-express/core";
import { HelmetProvider } from "react-helmet-async";
const path = require("path");
const { renderToString } = require("react-dom/server");
const React = require("react");
const { Provider } = require("react-redux");
const { StaticRouter } = require("react-router");
const { default: App } = require("../src/App");
const { configureStore } = require("../src/store");
const getMuiTheme = require("material-ui/styles/getMuiTheme").default;
const MuiThemeProvider = require("material-ui/styles/MuiThemeProvider").default;

const clientBuildPath = path.resolve(__dirname, "../client");
let tag = "";

const getReactApp = (req, res) => {
	const store = res.locals.store;
	const context = { store };

	const theme = getMuiTheme({
		userAgent: req.headers["user-agent"]
	});

	return (
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<MuiThemeProvider muiTheme={theme}>
					<HelmetProvider context={res.locals.helmetContext}>
						<App />
					</HelmetProvider>
				</MuiThemeProvider>
			</StaticRouter>
		</Provider>
	);
};

const handleUniversalRender = async (req, res) => {
	try {
		const store = configureStore({}, req);
		res.locals.store = store;
		res.locals.helmetContext = {};

		const app = getReactApp(req, res);
		renderToString(app);

		return app;
	} catch (error) {
		console.log(error);
		return res.error("Something fucked up");
	}
};

const app = createReactAppExpress({
	clientBuildPath,
	universalRender: handleUniversalRender,
	onFinish(req, res, html) {
		const state = res.locals.store.getState();
		const { helmet } = res.locals.helmetContext;
		const helmetTitle = helmet.title.toString();
		const helmetMeta = helmet.meta.toString();

		const newHtml = html
			.replace("</head>", helmetTitle + "</head>")
			.replace("</head>", helmetMeta + "</head>")
			.replace(
				"%PRELOADED_STATE%",
				JSON.stringify(state).replace(/</g, "\\u003c")
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
