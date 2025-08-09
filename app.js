import express from 'express';
import { config } from './config.js';
import studentsRouter from './routes/studentsRouter.js';

const app = express();
const port = config.PORT;

app.use(express.json());
app.use('/students', studentsRouter);

app.listen(port, (req, res) => {
  console.log('Server listening on port', port);
});
