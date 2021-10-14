import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();
const port: number = 3001;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, (): void => {
  console.log(`[Server running on http://localhost:${port}]`);
});
