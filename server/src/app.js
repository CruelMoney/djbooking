
const React = require('react');

const path = require('path');
const clientBuildPath = path.resolve(__dirname, 'client');
const {default: staticLoader} = require('@cra-express/static-loader');
const {default: universalLoader} = require('@cra-express/universal-loader');
const { renderToNodeStream, renderToString } = require("react-dom/server");

const {default: App} = require('../../src/App');
const {StaticRouter} = require('react-router-dom')
const { Provider } = require("react-redux");
const { configureStoreServer } = require('../../src/store');

var express = require('express');
var app = express();

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const getReactApp = (req) => {
  const store = configureStoreServer();
  const context = {
    store
  }
  
  const theme = getMuiTheme({
    userAgent: req.headers['user-agent'],
  });

  return( 
    <Provider store={store}>
      <StaticRouter
          location={req.url}
          context={context}
        >
        <MuiThemeProvider muiTheme={theme}>
          <App />
        </MuiThemeProvider>
      </StaticRouter>
    </Provider>
  )
}


const handleUniversalRender = async (req, res) => {  
  const stream = renderToNodeStream(getReactApp(req));
  return stream;
}


const renderer = async (req, res, stream, htmlData, options) => {
  var segments = htmlData.split('<div id="root">');
  res.write(segments[0] + '<div id="root">');
  stream.pipe(res, { end: false });
  stream.on('end', function () {
    if (options.onEndReplace) {
      segments[1] = options.onEndReplace(segments[1]);
    }
    res.write(segments[1]);
    res.end();
  });
}


// Adds the helmet markup to the end of head tag
const addHelmetDataToHTML = (htmlString) => {
  const segments = htmlString.split('</head>');
  const helmet = Helmet.renderStatic();

  return(`
    ${segments[0]}
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>
    ${segments[1]}
  `);
}


staticLoader(app, { clientBuildPath });
universalLoader(app, {
  universalRender: handleUniversalRender,
  handleRender: renderer,
  clientBuildPath
});


module.exports = app;



