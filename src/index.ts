import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './database';

function init(): void {
    connectDB();
    const port = app.get('port');
    app.listen(port, () => console.log('\x1b[36m%s\x1b[0m', `Server started on port ${port}`));
}

init();
