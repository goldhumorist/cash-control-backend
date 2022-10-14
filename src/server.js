const { config } = require('./config');
const { connectToDb } = require('./db');

(async () => {
  const PORT = config.port;

  try {
    await connectToDb();

    const app = await require('./app')();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}!`);
    });
  } catch (err) {
    console.err(err);
  }
})();
