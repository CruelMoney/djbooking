module.exports = {
  path: 'preferences',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Preferences').default)
    })
  }
}
