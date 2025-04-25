const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// const requestIp = require('request-ip');
const bookRoutes = require('./routes/bookRoutes');
// const { addLog } = require('./utils/logger');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: '*',
}));
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
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom, #3498db, #2c3e50);
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: auto;
          }
          .container {
            width: 90%;
            max-width: 1000px;
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          }
          h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            color: #f4f4f9;
          }
          p {
            font-size: 1.1em;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .endpoints {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
          }
          .card {
            background: rgba(255, 255, 255, 0.9);
            color: #2c3e50;
            border-radius: 8px;
            padding: 15px 20px;
            text-align: left;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            flex: 1 1 300px;
            max-width: 300px;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          }
          .card h3 {
            font-size: 1.3em;
            margin-bottom: 10px;
            color: #3498db;
          }
          .card p {
            font-size: 0.9em;
            margin: 5px 0;
          }
          .card a {
            text-decoration: none;
            font-weight: bold;
            color: #2c3e50;
            display: inline-block;
            margin-top: 10px;
          }
          .card a:hover {
            color: #3498db;
          }
          .docs-link {
            margin-top: 30px;
            display: inline-block;
            font-size: 1.2em;
            color: #fff;
            font-weight: bold;
            text-decoration: none;
            padding: 10px 20px;
            border: 2px solid #fff;
            border-radius: 8px;
            transition: background 0.3s, color 0.3s;
          }
          .docs-link:hover {
            background: #fff;
            color: #3498db;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to GDGOC-BOOK-API</h1>
          <p>Your API for managing book collections is live! Explore the available endpoints below:</p>
          <div class="endpoints">
            <div class="card">
              <h3>Retrieve All Books</h3>
              <p><strong>GET</strong> <code>/api/books</code></p>
              <p>Fetch the list of all books in the collection.</p>
              <a href="/api/books" target="_blank">Try it now</a>
            </div>
            <div class="card">
              <h3>Create a New Book</h3>
              <p><strong>POST</strong> <code>/api/books</code></p>
              <p>Add a new book to the collection.</p>
            </div>
            <div class="card">
              <h3>Retrieve a Book</h3>
              <p><strong>GET</strong> <code>/api/books/:id</code></p>
              <p>Find a book by its ID.</p>
            </div>
            <div class="card">
              <h3>Update a Book</h3>
              <p><strong>PUT</strong> <code>/api/books/:id</code></p>
              <p>Modify the details of an existing book.</p>
            </div>
            <div class="card">
              <h3>Delete a Book</h3>
              <p><strong>DELETE</strong> <code>/api/books/:id</code></p>
              <p>Remove a book from the collection by its ID.</p>
            </div>
          </div>
          <a href="https://github.com/mbudis23/gdgoc-book-api" target="_blank" class="docs-link">Read Full Documentation</a>
        </div>
      </body>
    </html>
  `);
});






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


