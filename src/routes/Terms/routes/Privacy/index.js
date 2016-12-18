module.exports = {
  path: 'privacy',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Privacy').default)
    })
  }
}
