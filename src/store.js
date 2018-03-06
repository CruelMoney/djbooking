import { 
  createStore, 
  applyMiddleware, 
  compose
 } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers/Store';
import { initialize as initLocale, addTranslation} from 'react-localize-redux';
import commonContent from "./constants/content/common.json";
import routesContent from "./constants/content/routes.json";

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
  
  if(!initialState.locale){
    let defaultLanguage = "en";
    let url = window.location.pathname.split('/');
    if(url[1] === "dk"){
      defaultLanguage = "da";
    }
  
    store.dispatch(initLocale(languages, {defaultLanguage: defaultLanguage}));
    store.dispatch(addTranslation(commonContent));
    store.dispatch(addTranslation(routesContent));
  }

//  persistStore(store);
  
  return store;
}


export const configureStoreServer = (initialState = {}, req) => {

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

  let defaultLanguage = "en";
  let url = req.path.split('/');
  if(url[1] === "dk"){
    defaultLanguage = "da";
  }
  
  store.dispatch(initLocale(languages, {defaultLanguage: defaultLanguage}));
  store.dispatch(addTranslation(commonContent));
  store.dispatch(addTranslation(routesContent));

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