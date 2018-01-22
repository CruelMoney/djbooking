/* eslint-disable import/first */
import React, {Component} from 'react'
import {
  Route,
  Switch,
  withRouter
  } from 'react-router-dom';
import { connect } from 'react-redux';
import {init as analytics} from './utils/analytics/autotrack';
import Loadable from 'react-loadable';
import NotFoundPage from './components/common/NotFoundPage';
import LoadHandler from './components/common/LoadingScreen';


const AsyncNavigation = Loadable({
  loader: () => import('./components/Navigation'),
  loading: LoadHandler
});
const AsyncAbout = Loadable({
  loader: () => import('./routes/About'),
  loading: LoadHandler
});
const AsyncHome = Loadable({
  loader: () => import('./routes/Home'),
  loading: LoadHandler
});
const AsyncEvent = Loadable({
  loader: () => import('./routes/Event'),
  loading: LoadHandler
});
const AsyncHowItWorks = Loadable({
  loader: () => import('./routes/HowItWorks'),
  loading: LoadHandler
});
const AsyncSignup = Loadable({
  loader: () => import('./routes/Signup'),
  loading: LoadHandler
});
const AsyncUser = Loadable({
  loader: () => import('./routes/User'),
  loading: LoadHandler
});
const AsyncFaq = Loadable({
  loader: () => import('./routes/Faq'),
  loading: LoadHandler
});
const AsyncTerms = Loadable({
  loader: () => import('./routes/Terms'),
  loading: LoadHandler
});


const App = class extends Component {

  componentDidMount(){
      // Setup custom analytics
      analytics();
      // Preload common pages
      AsyncHowItWorks.preload();
      AsyncSignup.preload();
   }

   componentWillReceiveProps(props){
      if(props.loggedIn){
        AsyncUser.preload();
      }
   }

   getPageLocation = () => {
    return typeof(window) !== 'undefined'
      ? window.location.pathname.split('/')[1] 
      : '';
   }

  render() {
    const page = this.getPageLocation();
  
    return (
      <div>
        <AsyncNavigation />
        <div id="content" className={`location_${page}`}>
          <Switch>
            <Route exact path="/" component={AsyncHome}/>
            <Route path="/about" component={AsyncAbout}/>
            <Route path="/user" component={AsyncUser}/>
            <Route path="/howitworks" component={AsyncHowItWorks}/>
            <Route path="/signup" component={AsyncSignup}/>
            <Route path="/faq" component={AsyncFaq}/>
            <Route path="/terms" component={AsyncTerms}/>
            <Route path="/event/:id/:hash" component={AsyncEvent}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
        <div id="popup-container"></div>
      </div> 
    );
  }
};

const mapStateToProps = (state, ownprops) => {
  return {
    loggedIn: state.login.status.signedIn,
    profile: state.login.profile
  }
}

export default withRouter(
  connect(mapStateToProps)(App)
);
