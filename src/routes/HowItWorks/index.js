module.exports = {
  path: 'howitworks',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/HowItWorks').default)
    })
  }
}
