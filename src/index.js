import '@babel/polyfill';
import dotenv from 'dotenv';

import app from './app';
import connectDB from './database';

dotenv.config();

async function main() {
  connectDB();
  const port = app.get('port');
  await app.listen(port, () =>
    console.log('\x1b[36m%s\x1b[0m', `Server started on port ${port}`)
  );
}

main();
