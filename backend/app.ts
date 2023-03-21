require('dotenv').config();
import 'express-async-errors';

import express from 'express';
import mongoose from 'mongoose';

import deptorRouter from './controllers/deptor';
import tableRouter from './controllers/table';

import { MONGODB_URI } from './util/config';

const app = express();

app.use(express.json());

app.use('/deptors', deptorRouter);

app.use('/tables', tableRouter)

const PORT = 3000;

mongoose.connect(MONGODB_URI!).then((db) => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Connected to ${db.connections[0].name} database`);
  });
});
