process.env.DOTENV_CONFIG_QUIET = 'true';

const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config({ path: resolve(__dirname, '..', '.env.test') });
