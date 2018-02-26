import { 
  createStore, 
  applyMiddleware, 
  compose
 } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers/Store';
import { persistStore } from 'redux-persist'


export const configureStore = (initialState = {}) => {

  // Create the store with two middlewares
  const middlewares = [
    thunkMiddleware
  ];

  if(process.env.NODE_ENV !== 'production'){
    middlewares.push(logger);
  }

  const enhancers = [
    applyMiddleware(...middlewares)
  ];
  
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(...enhancers)
  );

  const persistor = persistStore(store);

  // Purge store if token is expired
  const expiration = localStorage.getItem('expires_at');
  if(!!expiration &&  expiration < Date.now()){
    persistor.purge();
  }

  return store;
}


export const configureStoreServer = (initialState = {}) => {

  // Create the store with two middlewares
  const middlewares = [
    thunkMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const store = createStore(
    reducers,
    initialState,
    compose(...enhancers)
  );

  return store;
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = 
  typeof window !== 'undefined' 
  ? window.__PRELOADED_STATE__
  : {};

// Allow the passed state to be garbage-collected
typeof window !== 'undefined' && delete window.__PRELOADED_STATE__;

export let store = configureStore(preloadedState);