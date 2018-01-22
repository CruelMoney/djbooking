const path = require('path');

const React = require('react');
const { createReactAppExpress, handleUniversalRender } = require('create-react-app-express');

const {default: App} = require('../../src/App');
const clientBuildPath = path.resolve(__dirname, 'client');
const {StaticRouter} = require('react-router-dom')
const { Provider } = require("react-redux");
const { configureStoreServer } = require('../../src/store');

const getApp = (req) => {
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
  </Provider>)
}

const renderer = (req, res) => {
  return handleUniversalRender(getApp(req))(req, res);
} 

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: renderer
});

module.exports = app;



