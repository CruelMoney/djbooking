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

import Home from './routes/Home';
import Navigation from './components/Navigation';
import About from './routes/About';
import CueupEvent from './routes/Event';
import HowItWorks from './routes/HowItWorks';
import Signup from './routes/Signup';
import User from './routes/User';
import Faq from './routes/Faq';
import Terms from './routes/Terms';

const AsyncNavigation = Loadable({
  loader: () => import('./components/Navigation'),
  loading: ()=><div/>
});
// const AsyncAbout = Loadable({
//   loader: () => import('./routes/About'),
//   loading: LoadHandler
// });
// const AsyncHome = Loadable({
//   loader: () => import('./routes/Home'),
//   loading: LoadHandler
// });
// const AsyncEvent = Loadable({
//   loader: () => import('./routes/Event'),
//   loading: LoadHandler
// });
// const AsyncHowItWorks = Loadable({
//   loader: () => import('./routes/HowItWorks'),
//   loading: LoadHandler
// });
// const AsyncSignup = Loadable({
//   loader: () => import('./routes/Signup'),
//   loading: LoadHandler
// });
// const AsyncUser = Loadable({
//   loader: () => import('./routes/User'),
//   loading: LoadHandler
// });
// const AsyncFaq = Loadable({
//   loader: () => import('./routes/Faq'),
//   loading: LoadHandler
// });
// const AsyncTerms = Loadable({
//   loader: () => import('./routes/Terms'),
//   loading: LoadHandler
// });


const App = class extends Component {

  state={
    pageLocation: ""
  }

  componentDidMount(){
      this.setPageLocation();
      // Setup custom analytics
      analytics();
      // Preload common pages
      // AsyncHowItWorks.preload();
      // AsyncSignup.preload();
    
   }

   componentWillReceiveProps(props){
      if(props.loggedIn){
      //   AsyncUser.preload();
      }
      this.setPageLocation();
   }

   setPageLocation = () => {
     this.setState({
      pageLocation: typeof(window) !== 'undefined'
        ? window.location.pathname.split('/')[1] 
        : ''
    });
   }

  render() {
    const {pageLocation} = this.state;

    return (
      <div>
        <AsyncNavigation />
        <div id="content" className={`location_${pageLocation}`}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/user" component={User}/>
            <Route path="/howitworks" component={HowItWorks}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/faq" component={Faq}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/event/:id/:hash" component={CueupEvent}/>
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
