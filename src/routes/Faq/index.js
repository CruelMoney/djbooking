// module.exports = {
//   path: 'faq',
//   onEnter: () => document.title = "FAQ | Cueup",

//   getChildRoutes(partialNextState, cb) {
//     require.ensure([], (require) => {
//       cb(null, [
//         require('./routes/DJ'),
//         require('./routes/Organizer'),
//       ])
//     })
//   },

//   getComponent(nextState, cb) {
//     require.ensure([], (require) => {
//       cb(null, require('./components/Faq').default)
//     })
//   }
// }

import React, {Component} from 'react';
import {
  Switch, 
  Route
} from 'react-router';
import Faq from './components/Faq'
import DJ from './routes/DJ'
import Organizer from './routes/Organizer'

export default class Index extends Component{

  onComponentWillMount(){
    document.title = "FAQ | Cueup"
  }

  render(){
    return(
    <Faq {...this.props} >
      <Switch>
        <Route path={`/faq/dj`} component={DJ} />
        <Route path={`/faq/organizer`} component={Organizer} />
      </Switch>
    </Faq>
  )}
}
