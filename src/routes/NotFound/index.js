
//just redirecting to frontpage
module.exports = {
  path: '*',
  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../Home'),
      })
    })
  },

}
