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

const isClient = typeof window !== 'undefined';
const languages = ['en', 'da'];

const getDefaultLanguage = (req) => {
  let defaultLanguage = "en";
  if(isClient){
    let url = window.location.pathname.split('/');
    if(url[1] === "dk"){
      defaultLanguage = "da";
    }
  }else if(!!req){
    let url = req.path.split('/');
    if(url[1] === "dk"){
      defaultLanguage = "da";
    }
  }
  return defaultLanguage;
}

export const configureStore = (initialState = {}, req) => {
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
  
  const composeEnhancers = (isClient && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(...enhancers)
  );
  
  if(!initialState.locale){
    store.dispatch(initLocale(languages, {defaultLanguage: getDefaultLanguage(req)}));
    store.dispatch(addTranslation(commonContent));
    store.dispatch(addTranslation(routesContent));
  }

//  persistStore(store);
  
  return store;
}


// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = 
  isClient 
  ? window.__PRELOADED_STATE__
  : {};

// Allow the passed state to be garbage-collected
isClient && delete window.__PRELOADED_STATE__;

export let store = configureStore(preloadedState);