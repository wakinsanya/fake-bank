import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';

const app = express();

app.use(helmet);
app.use(compression());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to fake-bank-api!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
