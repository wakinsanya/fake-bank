import app from './app';
import { PORT } from './constants';
const chalk = require('chalk');

app.listen(PORT, () => console.log(chalk.magenta.bold(`Transaction API is listening on port ${PORT}/api/v1/`)));
