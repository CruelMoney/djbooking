import React, {Component} from 'react';
import {
  Switch, 
  Route,
  Redirect
} from 'react-router';
import Faq from './components/Faq'
import DJ from './routes/DJ'
import Organizer from './routes/Organizer'
import { Helmet } from 'react-helmet';
import { localize } from 'react-localize-redux'; 

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
        <Route path={translate("routes./faq/dj")} component={DJ} />
        <Route path={translate("routes./faq/organizer")} component={Organizer} />
      </Switch>
    </Faq>
  )}
}

export default localize(Index, 'locale');
