module.exports = {
  path: 'review',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ReviewForm').default)
    })
  }
}
