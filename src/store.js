import { 
  createStore, 
  applyMiddleware, 
  compose
 } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers/Store';
import { persistStore } from 'redux-persist'
import { initialize as initLocale, addTranslation} from 'react-localize-redux';
import commonContent from "./constants/commonContent.json";

const languages = ['en', 'da'];

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

  store.dispatch(initLocale(languages, {defaultLanguage: "da"}));
  store.dispatch(addTranslation(commonContent));

  persistStore(store);
  
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

  store.dispatch(initLocale(languages, {defaultLanguage: "da"}));

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