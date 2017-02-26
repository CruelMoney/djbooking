module.exports = {
  path: 'agreements',
  onEnter: () =>  document.title = "Terms of Service | Cueup",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Agreements').default)
    })
  }
}
