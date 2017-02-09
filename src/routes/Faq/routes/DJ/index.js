module.exports = {
  path: 'dj',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/DJ').default)
    })
  }
}
