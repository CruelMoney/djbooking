import AuthService from '../../utils/AuthService'
const auth = new AuthService()

function redirectNotAuth(nextState, replace){
     if (!auth.loggedIn()) {
       replace({
       pathname: '/',
       state: { nextPathname: nextState.location.pathname }
     })
   }
 }

module.exports = {
  path: 'user/:permalink',
  //onEnter: redirectNotAuth,

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('./routes/Profile'),
      })
    })
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Profile'),
        require('./routes/Gigs'),
        require('./routes/Events'),
        require('./routes/Reviews'),
        require('./routes/Preferences'),
        require('./routes/Book'),
      ])
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/pages/User').default)
    })
  }
}
