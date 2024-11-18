// Lokasi: /routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');

router.post('/', async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json({ message: "Book created successfully", data: book });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await bookService.getBooks();
    res.status(200).json({ message: "Books retrieved successfully", data: books });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
    try {
      const updatedBook = await bookService.updateBook(req.params.id, req.body);
      res.status(200).json({message:"Book updated succesfull",
        data: updatedBook});
    } catch (error) {
      if (error.message === "Book not found") {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
      const result = await bookService.deleteBook(req.params.id);
      res.status(200).json({ message: "delete succesfull"}); // Hanya mengirimkan response dengan pesan
    } catch (error) {
        if (error.message === "Book not found") {
          res.status(404).json({ message: error.message });
        } else {
          res.status(500).send({ message: error.message });
        }
      }
    });

    router.get('/:id', async (req, res) => {
        try {
          const { id } = req.params;  // Ambil ID dari parameter URL
          const book = await bookService.getBookById(id);
          if (book) {
            res.status(200).json({ data: book });
          } else {
            // Menanggapi dengan status 404 dan pesan yang jelas jika buku tidak ditemukan
            res.status(404).json({ message: "Book not found" });
          }
        } catch (error) {
          // Menanggapi dengan status 500 dan pesan error jika terjadi kesalahan server
          res.status(500).send({ message: "Internal server error" });
        }
      });

module.exports = router;
