const bookService = require('../services/bookService');

exports.createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json({ message: "Book created successfully", data: book });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks();
        res.status(200).json({ message: "Books retrieved successfully", data: books });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.updateBook = async (req, res) => {
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
}

exports.deleteBook = async (req, res) => {
    try {
        const result = await bookService.deleteBook(req.params.id);
        res.status(200).json({ message: "Delete succesfull"});
    } catch (error) {
        if (error.message === "Book not found") {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).send({ message: error.message });
        }
    }
}

exports.searchBook =  async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookService.getBookById(id);
        if (book) {
            res.status(200).json({ data: book });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}