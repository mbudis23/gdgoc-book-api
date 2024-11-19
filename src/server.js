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

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Welcome to GDGOC-BOOK-API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
          }
          .container {
            text-align: center;
          }
          h1 {
            color: #2c3e50;
          }
          p {
            font-size: 1.2em;
          }
          a {
            text-decoration: none;
            color: #3498db;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to GDGOC-BOOK-API</h1>
          <p>Your API for managing book collections is live!</p>
          <p>Check the available endpoints:</p>
          <ul>
            <li><a href="/api/books">/api/books</a> - Manage books</li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

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


