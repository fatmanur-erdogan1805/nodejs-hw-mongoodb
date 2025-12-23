// src/index.js
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js'; // .js eklemeyi unutma!


initMongoConnection()
  .then(() => {
    console.log('MongoDB connected successfully');
    setupServer();
  })
  .catch(err => console.error('Server failed to start', err));


