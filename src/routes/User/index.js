
// module.exports ={
//   path: 'user/:permalink',
//   //onEnter: redirectNotAuth,

//   getIndexRoute(partialNextState, callback) {
//     require.ensure([], function (require) {
//       callback(null, {
//         component: require('./routes/Profile'),
//       })
//     })
//   },

//   getChildRoutes(partialNextState, cb) {
//     require.ensure([], (require) => {
//       cb(null, [
//         require('./routes/Profile'),
//         require('./routes/Gigs'),
//         require('./routes/Events'),
//         require('./routes/Reviews'),
//         require('./routes/Preferences'),
//         require('./routes/Book'),
//       ])
//     })
//   },

//   getComponent(nextState, cb) {
//     require.ensure([], (require) => {
//       cb(null, require('./components/pages/User').default)
//     })
//   }
// }


import React, {Component} from 'react';
import {
  Switch, 
  Route
} from 'react-router';
import User from './components/pages/User'; 
import Profile from "./routes/Profile";
export default class Index extends Component{

  onComponentWillMount(){
    document.title = "Profile | Cueup"
  }

  render(){
    return(
    <User {...this.props} >
      <Switch>
        <Route path={`/user/:permalink/profile`} component={Profile} />
      </Switch>
    </User>
  )}
}
