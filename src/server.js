const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// const requestIp = require('request-ip');
const bookRoutes = require('./routes/bookRoutes');
// const { addLog } = require('./utils/logger');

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
// app.use(requestIp.mw());
// app.use(addLog);

app.use('/api/books', bookRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    success: false,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


