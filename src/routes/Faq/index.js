module.exports = {
  path: 'faq',
  onEnter: () => document.title = "FAQ | Cueup",

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/DJ'),
        require('./routes/Organizer'),
      ])
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Faq').default)
    })
  }
}
