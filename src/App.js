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
import {Environment} from './constants/constants'
import { Helmet } from 'react-helmet';
import Home from './routes/Home';
import About from './routes/About';
import CueupEvent from './routes/Event';
import HowItWorks from './routes/HowItWorks';
import Signup from './routes/Signup';
import User from './routes/User';
import Faq from './routes/Faq';
import Terms from './routes/Terms';
import NotFound from './routes/NotFound';
import LocationLanding from './routes/Location';
import defaultImage from './assets/images/cities/default.png'
import Blog from './routes/Blog';
import ErrorHandling from './components/common/ErrorPage'
import Navigation from './components/Navigation';

// const AsyncNavigation = Loadable({
//   loader: () => import('./components/Navigation'),
//   loading: ()=><div/>
// });
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
   }


  render() {
    const { location } = this.props;
    const description = 'Cueup is an online platform connecting DJs and event organizers - the easiest way for you to book a great DJ for your event.  Just tell us about your event, and within 1 day you will receive non-binding offers from DJs near you.'
    const pageURL = Environment.CALLBACK_DOMAIN + location.pathname;

    return (
      <ErrorHandling>
        <div className={`location_${location.pathname.split('/')[1]}`}>
          <Helmet>
              <title>Book DJs with ease | Cueup</title>

              <meta name="description" content={description} />
              <meta name="keywords" content="dj, book, rent, copenhagen, cueup, music, events, party, wedding, birthday" />

              <meta property="og:url"             content={pageURL} />
              <meta property="fb:app_id"          content={Environment.FACEBOOK_ID}/>
              <meta property="og:title"           content="Book DJs with ease | Cueup" />
              <meta property="og:description"     content={description} />
              <meta property="og:image"           content={defaultImage} />

              <meta name="twitter:card"               content="summary_large_image" />
              <meta name="twitter:site"               content="@@CueupDK" />
              <meta name="twitter:creator"            content="@@CueupDK" />
              <meta name="twitter:title"              content="Book DJs with ease | Cueup" />
              <meta name="twitter:description"        content={description} />
              <meta name="twitter:image"              content={defaultImage} />
              <meta name="twitter:url"                content={pageURL} />

            </Helmet>
          <Navigation />
          <div id="content" className={`location_${location.pathname.split('/')[1]}`}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/user" component={User}/>
              <Route path="/howitworks" component={HowItWorks}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/faq" component={Faq}/>
              <Route path="/terms" component={Terms}/>
              <Route path="/event/:id/:hash" component={CueupEvent}/>
              <Route path="/book-dj/:country/:city?" component={LocationLanding}/>
              <Route path="/blog" component={Blog}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
          <div id="popup-container"></div>
        </div> 
      </ErrorHandling>

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
