require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import deptorRouter from './controllers/deptor';
import tableRouter from './controllers/table';
import cafeRouter from './controllers/cafe';
import employeeRouter from './controllers/employee';

import { MONGODB_URI } from './util/config';
import { errorHandler } from './util/middleware';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/employees', employeeRouter);

app.use('/api/cafe', cafeRouter);

app.use('/api/deptors', deptorRouter);

app.use('/api/tables', tableRouter);

app.use(errorHandler);

const PORT = 3000;

mongoose.connect(MONGODB_URI!).then((db) => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Connected to ${db.connections[0].name} database`);
  });
});
