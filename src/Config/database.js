const database = require('../Helpers/databaseHelper');

const connectToDB = () => {
  database
    .openConnection()
    .then((info) => {
      console.log(
        `Database connected to ${info.host}:${info.port}/${info.name}`
      );
    })
    .catch((err) => {
      console.log({ Error: err });
      console.log('Unable to connect to database');
      process.exit(1);
    });
};

module.exports = connectToDB;
