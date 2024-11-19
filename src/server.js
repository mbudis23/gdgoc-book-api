const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const requestIp = require('request-ip');
const bookRoutes = require('./routes/bookRoutes');
const { addLog } = require('./utils/logger');

dotenv.config();

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk logging request
// app.use(morgan('dev'));

// Middleware untuk mendapatkan IP klien
app.use(requestIp.mw());

// Middleware untuk mencetak waktu dan IP ke terminal
app.use(addLog);

// Routes
app.use('/api/books', bookRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    success: false,
  });
});

// Port konfigurasi
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const express = require('express');
// const app = express();
// const bookRoutes = require('./routes/bookRoutes');
// const dotenv = require('dotenv')
// const morgan = require('morgan');

// dotenv.config()

// app.use(express.json());
// app.use(morgan('dev'))
// app.use('/api/books', bookRoutes);


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
