module.exports = {
  db: {
    connection: process.env.DB_MONGO,
  },
  app: {
    port: process.env.PORT,
  },
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
};
