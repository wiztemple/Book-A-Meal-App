import express from 'express';
import logger from 'volleyball';
import bodyParser from 'body-parser';
import routes from './routes';


const port = process.env.PORT || 8000;
const app = express();

// log every request to
app.use(logger);

// parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


routes(app);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;

