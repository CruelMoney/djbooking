module.exports = {
  path: 'event/:id/:hash',

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('./routes/EventInformation'),
      })
    })
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Offers'),
        require('./routes/Review'),
        require('./routes/User'),
        require('./routes/EventInformation'),
      ])
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Event').default)
    })
  }
}
