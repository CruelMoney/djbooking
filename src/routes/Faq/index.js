import React, {Component} from 'react';
import {
  Switch, 
  Route,
  Redirect
} from 'react-router';
import Faq from './components/Faq'
import DJ from './routes/DJ'
import Organizer from './routes/Organizer'
import { Helmet } from 'react-helmet-async';

import content from './content.json';
import addTranslate from '../../components/higher-order/addTranslate';

class Index extends Component{
  render(){
    const {match, translate} = this.props
    const title = "FAQ | Cueup"

    return(
    <Faq {...this.props} >
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
      <Switch>
        <Redirect exact from={`${match.url}`} to={translate("routes./faq/dj")} />
        <Route path={translate("routes./faq/dj")} render={(props)=><DJ {...props} translate={translate}/>} />
        <Route path={translate("routes./faq/organizer")} render={(props)=><Organizer {...props} translate={translate}/>} />
      </Switch>
    </Faq>
  )}
}

export default addTranslate(Index, content);
