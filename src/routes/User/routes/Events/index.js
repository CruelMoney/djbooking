module.exports = {
  path: 'events',
   onEnter: () => document.title = document.title.split('|')[0] + "| Events",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Events').default)
    })
  }
}
