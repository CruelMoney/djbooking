module.exports = {
  path: 'book',
   onEnter: () => document.title = document.title.split('|')[0] + "| Book",

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Book').default)
    })
  }
}
