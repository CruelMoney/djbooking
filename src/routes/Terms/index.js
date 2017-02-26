module.exports = {
  path: 'terms',
  onEnter: () =>  document.title = "Terms & Conditions | Cueup",

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      console.log(require('./routes/Agreements'))
      callback(null, {
        component: require('./routes/Agreements'),
      })
    })
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Agreements'),
        require('./routes/Privacy'),
      ])
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Terms').default)
    })
  }
}
