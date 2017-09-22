module.exports = {
  path: 'signup',
  onEnter: () =>  document.title = "Apply to become DJ | Cueup",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Signup').default)
    })
  }
}
