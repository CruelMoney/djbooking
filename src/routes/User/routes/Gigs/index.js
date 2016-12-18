module.exports = {
  path: 'gigs',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Gigs').default)
    })
  }
}
