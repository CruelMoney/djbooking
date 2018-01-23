require('dotenv').config()
const app = require('./app');
const Loadable = require('react-loadable');

const PORT = process.env.PORT || 3001;

Loadable.preloadAll().then(() => {
  console.log("preloaded")
  app.listen(PORT, () => {
    console.log(`CRA Server listening on port ${PORT}!`);
  });
}).catch(console.log);
