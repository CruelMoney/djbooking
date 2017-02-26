module.exports = {
  path: 'about',
  onEnter: () =>  document.title = "About | Cueup",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/About').default)
    })
  }
}
