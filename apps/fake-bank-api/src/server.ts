import app from './app';
import { PORT } from './constants';
const chalk = require('chalk');

app.listen(PORT, () => console.log(chalk.cyan.bold(`Listening on port ${PORT}/api`)));
