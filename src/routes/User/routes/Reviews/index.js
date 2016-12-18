module.exports = {
  path: 'reviews',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Reviews').default)
    })
  }
}
