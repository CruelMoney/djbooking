import React, {Component} from 'react';
import {
  Switch, 
  Route
} from 'react-router';
import User from './components/pages/User'; 
import FinishSignup from './components/pages/FinishSignup'; 
import Profile from "./routes/Profile";
import Book from "./routes/Book";
import Events from "./routes/Events";
import Gigs from "./routes/Gigs";
import Preferences from "./routes/Preferences";
import Reviews from "./routes/Reviews";
import {getTranslate, addTranslation} from 'react-localize-redux';
import content from './content.json';
import {store} from '../../store';
import {connect} from 'react-redux';

store.dispatch(addTranslation(content));

class Index extends Component{
  render(){
    const {match, translate} = this.props
    return(
      <Switch>
        <Route exact path={`${match.url}`} component={FinishSignup} />
        <Route path={`${match.url}`} render={(props)=>{
          return (
            <User {...this.props} {...props} >
              <Switch>
                <Route path={`${match.url}/profile`} render={(props)=><Profile {...this.props} {...props} />} />
                <Route path={`${match.url}/book`} render={(props)=><Book {...this.props} {...props} />} />
                <Route path={`${match.url}/${translate("preferences")}`} render={(props)=><Preferences {...this.props} {...props} />} />
                <Route path={`${match.url}/events`} render={(props)=><Events {...this.props} {...props} />} />
                <Route path={`${match.url}/gigs`} render={(props)=><Gigs {...this.props} {...props} />} />
                <Route path={`${match.url}/${translate("reviews")}`} render={(props)=><Reviews {...this.props} {...props} />} />
              </Switch>
            </User>
          )
        }}/>
      </Switch>
  
  )}
}

function mapStateToProps(state, ownProps) {
  const isOwnProfile = 
    state.login.status.publicProfileMode ? false :
    (!!state.login.profile.user_metadata && !!state.login.profile.user_metadata.permaLink) 
    ? state.login.profile.user_metadata.permaLink.toLowerCase() === ownProps.match.params.permalink.toLowerCase()
    : false
  
  return {
    isOwnProfile:isOwnProfile,
    publicProfileMode: state.login.status.publicProfileMode,
    profile:  isOwnProfile ? state.login.profile : state.user.profile,
    loading: isOwnProfile ? state.login.status.isWaiting : state.user.status.isWaiting,
    geoCity: state.session.city,
    geoCountry: state.session.country,
    notifications: state.notifications.data,
    isOwnProfile:isOwnProfile,
    translate: getTranslate(state.locale)
  }
}



export default connect(mapStateToProps)(Index);
