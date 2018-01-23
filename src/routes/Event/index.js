import React, {Component} from 'react';
import Event from './components/Event'; 
import EventInfo from './routes/EventInformation'; 
import Offers from './routes/Offers'; 
import Review from './routes/Review'; 
import User from './routes/User'; 
import { Helmet } from 'react-helmet';

import {Switch, Route} from 'react-router-dom'; 

export default class Index extends Component{


  render(){
    return(
      <div>
      <Helmet>
        <title>Event | Cueup</title>
        <meta name="og:title"           content="Event | Cueup" />
        <meta name="twitter:title"      content="Event | Cueup" />
      </Helmet>
      <Event {...this.props}>
        <Switch>
          <Route path={`/event/:id/:hash/info`} component={EventInfo}/>
          <Route path={`/event/:id/:hash/offers`} component={Offers}/>
          <Route path={`/event/:id/:hash/review`} component={Review}/>
          <Route path={`/event/:id/:hash/user`} component={User}/>
        </Switch>
      </Event>
    </div>

  )}
}



