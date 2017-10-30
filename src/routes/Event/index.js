// module.exports = {
//   path: 'event/:id/:hash',

//   onEnter: () =>  document.title = "Event | Cueup",


//   getIndexRoute(partialNextState, cb) {
//     require.ensure([], function (require) {
//       cb(null, {
//         component: require('./routes/EventInformation'),
//       })
//     })
//   },

//   getChildRoutes(partialNextState, cb) {
//     require.ensure([], (require) => {
//       cb(null, [
//         require('./routes/Offers'),
//         require('./routes/Review'),
//         require('./routes/User'),
//         require('./routes/EventInformation'),
//       ])
//     })
//   },

//   getComponent(nextState, cb) {
//     require.ensure([], (require) => {
//       cb(null, require('./components/Event').default)
//     })
//   }
// }



import React, {Component} from 'react';
import Event from './components/Event'; 
import EventInfo from './routes/EventInformation'; 
import {Switch, Route} from 'react-router-dom'; 

export default class Index extends Component{

  onComponentWillMount(){
    document.title = "Event | Cueup"
  }

  render(){
    return(
    <Event>
      <Switch>
        <Route path={`${this.props.match.url}/info`} component={EventInfo}/>
      </Switch>
    </Event>
  )}
}
