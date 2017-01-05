module.exports = {
  path: 'info',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      console.log("requireing");
      cb(null, require('./components/EventCard').default)
    })
  }
}
