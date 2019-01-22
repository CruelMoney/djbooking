require('dotenv').config()
require('isomorphic-fetch');
const app = require('./app');
const Loadable = require('react-loadable');

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
  console.log(`CRA Server listening on port ${PORT}!`);
});