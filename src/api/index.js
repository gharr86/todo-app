const express = require('express');
const app = express();

const cors = require('cors');

const routes = require('./routes');

const port = 3001;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`[Server running on http://localhost:${port}]`);
});
