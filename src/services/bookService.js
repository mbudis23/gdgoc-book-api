const db = require('../config/firebaseConfig');
const getNewId = require('./counter');

exports.createBook = async ({ title, author, published_at }) => {
    const id = await getNewId();
    const now = new Date().toISOString();
    const bookData = {
    title,
    author,
    published_at,
    created_at: now,
    updated_at: now
    };
    await db.ref(`books/${id}`).set(bookData);
    return { id, ...bookData };
};

exports.getBooks = async () => {
    const snapshot = await db.ref('books').once('value');
    const books = [];
    snapshot.forEach(childSnapshot => {
    const key = Number(childSnapshot.key);
    const book = childSnapshot.val();
    books.push({ id: key, ...book });
    });
    return books;
};

exports.updateBook = async (id, updates) => {
    const now = new Date().toISOString();
    updates.updated_at = now;
    const bookRef = db.ref(`books/${id}`);
    await bookRef.update(updates);
    const updatedSnapshot = await bookRef.once('value');
    const updatedBook = updatedSnapshot.val();
    
    if (!updatedBook) {
      throw new Error('Book not found');
    }
  
    return {
        id: Number(id),  // Konversi ID ke number
        title: updatedBook.title,
        author: updatedBook.author,
        published_at: updatedBook.published_at,
        created_at: updatedBook.created_at,
        updated_at: updatedBook.updated_at
    };
  };

exports.deleteBook = async (id) => {
    const bookRef = db.ref(`books/${id}`);
    const snapshot = await bookRef.once('value');
    if (!snapshot.exists()) {
        throw new Error("Book not found");
    }
    await bookRef.remove();
    return { message: "Book deleted successfully" };
};

exports.getBookById = async (id) => {
    const bookRef = db.ref(`books/${id}`);
    const snapshot = await bookRef.once('value');
    if (snapshot.exists()) {
        return {
        id: Number(id),
        ...snapshot.val()
        };
    } else {
        return null;
    }
};