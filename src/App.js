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
import { getActiveLanguage, getTranslate, setActiveLanguage } from 'react-localize-redux';
import 'moment/locale/da';
import moment from 'moment';




const App = class extends Component {

  state={
    pageLocation: ""
  }
  
  componentWillMount(){
    const { activeLanguage, setActiveLanguage, location } = this.props;
    const url = location.pathname.split('/');
    const locale = url[1] === "dk" ? "da" : "en";

    if(activeLanguage !== locale){
      setActiveLanguage(locale)
    }
    moment.locale(locale);
  }

  componentDidMount(){
      // Setup custom analytics
      analytics();
      // Preload common pages
      // AsyncHowItWorks.preload();
      // AsyncSignup.preload();
   }

   componentWillReceiveProps(nextprops){


    const {activeLanguage, loggedIn} = this.props;
      if(activeLanguage !== nextprops.activeLanguage){
        moment.locale(nextprops.activeLanguage);
      }
   }


  render() {
    const { location, translate, activeLanguage } = this.props;
    const description = 'Cueup is an online platform connecting DJs and event organizers - the easiest way for you to book a great DJ for your event.  Just tell us about your event, and within 1 day you will receive non-binding offers from DJs near you.'
    const pageURL = Environment.CALLBACK_DOMAIN + location.pathname;
    const url = location.pathname.split('/');
    let cssLocation = url[1] === "dk" ? url[2] : url[1];
    cssLocation = `location_${cssLocation || ""}`;

    return (
      <ErrorHandling>
        <div className={cssLocation}>
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
          <div id="content" className={cssLocation}>
            <Switch>
              <Route exact path={translate("routes./")} component={Home}/>
              <Route path={translate("routes./about")} component={About}/>
              <Route path={translate("routes./user")} component={User}/>
              <Route path={translate("routes./how-it-works")} component={HowItWorks}/>
              <Route path={translate("routes./signup")} component={Signup}/>
              <Route path={translate("routes./faq")} component={Faq}/>
              <Route path={translate("routes./terms")} component={Terms}/>
              <Route path={translate("routes./event")+"/:id/:hash"} component={CueupEvent}/>
              <Route path={translate("routes./book-dj")+"/:country/:city?"} component={LocationLanding}/>
              <Route path={translate("routes./blog")} component={Blog}/>
                        
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
    profile: state.login.profile,
    activeLanguage: getActiveLanguage(state.locale).code,
    translate: getTranslate(state.locale)
  }
}


function mapDispatchToProps(dispatch, ownprops) {
  return {
    setActiveLanguage: (code) => {dispatch(setActiveLanguage(code))}
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    App
  )
);
