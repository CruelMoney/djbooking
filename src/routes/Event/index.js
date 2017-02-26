module.exports = {
  path: 'event/:id/:hash',

  onEnter: () =>  document.title = "Event | Cueup",


  getIndexRoute(partialNextState, cb) {
    require.ensure([], function (require) {
      cb(null, {
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
