module.exports = {
  path: 'signup',
  onEnter: () =>  document.title = "Become DJ | Cueup",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Signup').default)
    })
  }
}
