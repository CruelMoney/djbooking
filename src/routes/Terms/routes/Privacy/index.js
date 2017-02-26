module.exports = {
  path: 'privacy',
  onEnter: () =>  document.title = "Privacy Policy | Cueup",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Privacy').default)
    })
  }
}
