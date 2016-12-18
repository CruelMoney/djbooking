module.exports = {
  path: 'events',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Events').default)
    })
  }
}
