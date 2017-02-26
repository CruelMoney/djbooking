module.exports = {
  path: 'howitworks',

  onEnter: () =>  document.title = "How it works | Cueup",


  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/HowItWorks').default)
    })
  }
}
