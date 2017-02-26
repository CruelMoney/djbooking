module.exports = {

  onEnter: () =>  document.title = "Book DJs with ease | Cueup",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Home').default)
    })
  }
}
