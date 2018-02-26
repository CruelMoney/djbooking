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
    const {match} = this.props
    const title = "FAQ | Cueup"

    return(
    <Faq {...this.props} >
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
      <Switch>
        <Redirect exact from={`${match.url}`} to={`${match.url}/dj`} />
        <Route path={`${match.url}/dj`} component={DJ} />
        <Route path={`${match.url}/organizer`} component={Organizer} />
      </Switch>
    </Faq>
  )}
}
