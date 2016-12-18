module.exports = {
  path: 'agreements',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Agreements').default)
    })
  }
}
