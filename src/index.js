const app = require('./Config/app')();
const connectToDB = require('./Config/database');

const port = process.env.PORT;

(async () => {
  connectToDB();
  await app.listen(port);
  console.log(`Server started on port: ${port}`);
})();
