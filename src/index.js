require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const server = require('./Config/app')();
const connectToDB = require('./Config/database');

const port = process.env.PORT || 3001;

(async () => {
  connectToDB();
  await server.listen(port);
  console.log(`Server started on port: ${port}`);
})();
