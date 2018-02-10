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

export default class Index extends Component{
  render(){
    const title = "FAQ | Cueup"

    return(
    <Faq {...this.props} >
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
      <Switch>
        <Redirect exact from={`/faq`} to={`/faq/dj`} />
        <Route path={`/faq/dj`} component={DJ} />
        <Route path={`/faq/organizer`} component={Organizer} />
      </Switch>
    </Faq>
  )}
}
