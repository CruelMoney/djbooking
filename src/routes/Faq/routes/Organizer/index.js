module.exports = {
  path: 'organizer',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Organizer').default)
    })
  }
}
