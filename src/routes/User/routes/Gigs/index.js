module.exports = {
  path: 'gigs',
   onEnter: () => document.title = document.title.split('|')[0] + "| Gigs",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Gigs').default)
    })
  }
}
