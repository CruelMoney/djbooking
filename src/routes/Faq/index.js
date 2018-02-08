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
        <Route path={`/faq/dj`} component={DJ} />
        <Route path={`/faq/organizer`} component={Organizer} />
      </Switch>
    </Faq>
  )}
}
