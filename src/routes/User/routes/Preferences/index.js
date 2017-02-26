module.exports = {
  path: 'preferences',
   onEnter: () => document.title = document.title.split('|')[0] + "| Preferences",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Preferences').default)
    })
  }
}
