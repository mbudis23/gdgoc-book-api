const express = require('express');
const router = express.Router();
const { getAllBooks, createBook, updateBook, deleteBook, searchBook } = require('../controllers/bookController');

router.post('/', createBook);
router.get('/', getAllBooks);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.get('/:id', searchBook);

module.exports = router;
