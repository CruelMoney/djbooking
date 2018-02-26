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
    const {match} = this.props

    return(
      <div>
      <Helmet>
        <title>Event | Cueup</title>
        <meta property="og:title"           content="Event | Cueup" />
        <meta name="twitter:title"      content="Event | Cueup" />
      </Helmet>
      <Event {...this.props}>
        <Switch>
          <Route path={`${match.url}/:id/:hash/info`} component={EventInfo}/>
          <Route path={`${match.url}/:id/:hash/offers`} component={Offers}/>
          <Route path={`${match.url}/:id/:hash/review`} component={Review}/>
          <Route path={`${match.url}/:id/:hash/user`} component={User}/>
        </Switch>
      </Event>
    </div>

  )}
}



