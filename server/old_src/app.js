const getMuiTheme = require("material-ui/styles/getMuiTheme").default;
const MuiThemeProvider = require("material-ui/styles/MuiThemeProvider").default;
const React = require("react");
const path = require("path");
const { default: staticLoader } = require("@cra-express/static-loader");
const { default: universalLoader } = require("@cra-express/universal-loader");
const { renderToNodeStream, renderToString } = require("react-dom/server");
const { default: Helmet, HelmetProvider } = require("react-helmet-async");
const { default: App } = require("../../src/App");
const { StaticRouter } = require("react-router-dom");
const { Provider } = require("react-redux");
const { configureStore } = require("../../src/store");
const proxy = require("express-http-proxy");
const clientBuildPath = path.resolve(__dirname, "client");

var express = require("express");
var app = express();

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
	const store = configureStore({}, req);
	res.locals.store = store;
	res.locals.helmetContext = {};

	renderToString(getReactApp(req, res));
	const preloadedState = store.getState();

	await Promise.all(preloadedState.session.promises);

	const stream = renderToNodeStream(getReactApp(req, res));
	return stream;
};

const renderer = async (req, res, stream, htmlData, options) => {
	const preloadedState = res.locals.store.getState();
	htmlData = htmlData.replace(
		`"%PRELOADED_STATE%"`,
		JSON.stringify(preloadedState).replace(/</g, "\\u003c")
	);

	renderToString(getReactApp(req, res));
	htmlData = addHelmetDataToHTML(htmlData, res);

	var segments = htmlData.split('<div id="root">');
	res.write(segments[0] + '<div id="root">');
	stream.pipe(
		res,
		{ end: false }
	);
	stream.on("end", function() {
		if (options.onEndReplace) {
			segments[1] = options.onEndReplace(segments[1]);
		}
		res.write(segments[1]);
		res.end();
	});
};

// Adds the helmet markup to the end of head tag
const addHelmetDataToHTML = (htmlString, res) => {
	const segments = htmlString.split("</head>");
	const { helmet } = res.locals.helmetContext;

	return `
    ${segments[0]}
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>
    ${segments[1]}
  `;
};

const production = process.env.NODE_ENV === "production";
const apiDomain = production
	? process.env.REACT_APP_CUEUP_PROD_API_DOMAIN
	: process.env.REACT_APP_CUEUP_DEV_API_DOMAIN;

app.use("/api", proxy(apiDomain));

staticLoader(app, { clientBuildPath });
universalLoader(app, {
	universalRender: handleUniversalRender,
	handleRender: renderer,
	clientBuildPath
});

module.exports = app;