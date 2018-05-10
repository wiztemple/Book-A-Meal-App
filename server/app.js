import express from 'express';
import config from 'dotenv';
import logger from 'volleyball';
import bodyParser from 'body-parser';
import db from './src/models/index';
import routes from './src/routes';

config.config();

const port = process.env.PORT;

const app = express();

app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.all('/api*', (request, response) => {
  response.status(404).send('The API route you requested does not exist');
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`App Listening on port ${port}`);
  });
});

export default app;
