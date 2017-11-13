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

export default class Index extends Component{

  onComponentWillMount(){
    document.title = "Profile | Cueup"
  }

  render(){
    return(
      <Switch>
        <Route path={`/user/`} component={FinishSignup} />
        <Route path={`/user/:permalink`} render={()=>{
          return (
            <User {...this.props} >
              <Switch>
                <Route path={`/user/:permalink/profile`} component={Profile} />
                <Route path={`/user/:permalink/book`} component={Book} />
                <Route path={`/user/:permalink/preferences`} component={Preferences} />
                <Route path={`/user/:permalink/events`} component={Events} />
                <Route path={`/user/:permalink/gigs`} component={Gigs} />
                <Route path={`/user/:permalink/reviews`} component={Reviews} />
              </Switch>
            </User>
          )
        }}/>
      </Switch>
  
  )}
}
