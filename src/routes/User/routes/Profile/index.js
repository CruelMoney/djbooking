module.exports = {
  path: 'profile',
   onEnter: () => document.title = document.title.split('|')[0] + "| Profile",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Profile').default)
    })
  }
}
