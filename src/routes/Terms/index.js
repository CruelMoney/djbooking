import React, {Component} from 'react';
import {
  Switch, 
  Route
} from 'react-router';
import Terms from './components/Terms'
import Agreements from './routes/Agreements'
import Privacy from './routes/Privacy'
import { Helmet } from 'react-helmet';
import { localize } from 'react-localize-redux'; 

class Index extends Component{
  render(){
    const {match, translate} = this.props;

    const title = "Terms & Privacy | Cueup";
    
    return(
    <Terms {...this.props} >
        <Helmet>
        <title>{title}</title>
        <meta property="og:title"       content={title} />
        <meta name="twitter:title"      content={title} />
      </Helmet>
      <Switch>
        <Route path={translate("routes./terms/agreements")} component={Agreements} />
        <Route path={translate("routes./terms/privacy")} component={Privacy} />
      </Switch>
    </Terms>
  )}
}

export default localize(Index, 'locale');
