import React, {Component} from 'react';
import Event from './components/Event'; 
import EventInfo from './routes/EventInformation'; 
import Offers from './routes/Offers'; 
import Review from './routes/Review'; 
import User from './routes/User'; 
import { Helmet } from 'react-helmet';
import {addTranslation, localize} from 'react-localize-redux';
import {Switch, Route} from 'react-router-dom'; 
import {store} from '../../store';
import content from './content.json';

store.dispatch(addTranslation(content));

class Index extends Component{
  render(){
    const { translate } = this.props;
    const baseurl = translate("routes./event/:id/:hash");
    
    return(
      <div>
      <Helmet>
        <title>Event | Cueup</title>
        <meta property="og:title"           content="Event | Cueup" />
        <meta name="twitter:title"      content="Event | Cueup" />
      </Helmet>
      <Event {...this.props}>
        <Switch>
          <Route path={`${baseurl}/info`} component={EventInfo}/>
          <Route path={`${baseurl}/offers`} component={Offers}/>
          <Route path={`${baseurl}/review`} component={Review}/>
          <Route path={`${baseurl}/user`} component={User}/>
        </Switch>
      </Event>
    </div>

  )}
}

export default localize(Index, 'locale');



