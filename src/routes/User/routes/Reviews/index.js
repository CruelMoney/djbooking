module.exports = {
  path: 'reviews',
   onEnter: () => document.title = document.title.split('|')[0] + "| Reviews",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Reviews').default)
    })
  }
}
