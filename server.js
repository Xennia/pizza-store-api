const express = require('express');
const bodyParser = require('body-parser');
const ordersRouter = require('./routes/orders');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use('/api/orders', ordersRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

