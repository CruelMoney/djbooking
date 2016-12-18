module.exports = {
  path: 'offers',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/EventOffers').default)
    })
  }
}
