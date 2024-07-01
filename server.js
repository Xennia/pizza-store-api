require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
