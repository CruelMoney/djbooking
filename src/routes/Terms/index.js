import React, {Component} from 'react';
import {
  Switch, 
  Route
} from 'react-router';
import Terms from './components/Terms'
import Agreements from './routes/Agreements'
import Privacy from './routes/Privacy'

export default class Index extends Component{

  onComponentWillMount(){
    document.title = "Terms & Privacy | Cueup"
  }

  render(){
    return(
    <Terms {...this.props} >
      <Switch>
        <Route path={`/terms/agreements`} component={Agreements} />
        <Route path={`/terms/privacy`} component={Privacy} />
      </Switch>
    </Terms>
  )}
}
