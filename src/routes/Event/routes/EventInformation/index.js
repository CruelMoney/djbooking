module.exports = {
  path: 'info',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/EventCard').default)
    })
  }
}
