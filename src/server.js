const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const dotenv = require('dotenv')
const morgan = require('morgan');

dotenv.config()

app.use(express.json());
app.use(morgan('dev'))
app.use('/api/books', bookRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
