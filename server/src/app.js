
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
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import stats from '../dist/react-loadable.json';

var express = require('express');
var app = express();


const getReactApp = (req) => {
  const store = configureStoreServer();
  const context = {
    store
  }
    
  return( 
    <Provider store={store}>
      <StaticRouter
          location={req.url}
          context={context}
        >
          <App />
      </StaticRouter>
    </Provider>
  )
}


const handleUniversalRender = async (req, res) => {

  let modules = [];
  let html = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      {getReactApp(req)}
    </Loadable.Capture>
  );
  let bundles = getBundles(stats, modules);

  res.locals = {
    ...res.locals,
    bundles
  }
  
  const stream = renderToNodeStream(getReactApp(req));
  return stream;
}


const renderer = async (req, res, stream, htmlData, options) => {
  //htmlData = addBundlesToHTML(htmlData, res.locals.bundles);


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


const addBundlesToHTML = (htmlData, bundles) => {
  const segments = htmlData.split('</body>');

  return(`
    ${segments[0]}
    ${bundles.map(bundle => {
      return `<script src="/dist/${bundle.file}"></script>`
    }).join('\n')}
    </body>
    ${segments[1]}
  `);
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



