import express from 'express';
import { config } from './config.js';
import { studentsRouter } from './routes/studentsRouter.js';
import { teachersRouter } from './routes/teachersRouter.js';

const app = express();
const port = config.PORT;

app.use(express.json());
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);

app.listen(port, (req, res) => {
  console.log('Server listening on port', port);
});
