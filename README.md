
# GDGOC-BOOK-API

Welcome to **GDGOC-BOOK-API**, an API for managing book collections. This API provides endpoints for creating, reading, updating, deleting, and searching books. It is built using **Express.js** and integrates with **Firebase Realtime Database** for data storage.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [API Endpoints](#api-endpoints)
4. [Usage](#usage)
5. [Live Demo](#live-demo)
6. [License](#license)

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/mbudis23/gdgoc-book-api
   cd gdgoc-book-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase Realtime Database project.
   - Obtain the `serviceAccountKey.json` file from Firebase and place it in the `config/` directory.
   - Ensure your Firebase database rules allow read and write access.

4. Configure environment variables:
   - Create a `.env` file in the project root.
   - Add the following variables:
     ```
     PORT=3000
     ```

5. Start the server:
   ```bash
   npm start
   ```

---

## Configuration

Ensure you have set up Firebase correctly by updating the `firebaseConfig.js` file with your Firebase credentials. The file should look like this:

```javascript
const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\n/g, '
'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.CLIENT_EMAIL.replace(
      '@',
      '%40'
    )}`
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

module.exports = db;
```

---

## API Endpoints

### 1. **Create a Book**
   **POST** `/api/books`

   - **Request Body:**
     ```json
     {
       "title": "5 Minute to Learn Go",
       "author": "Sundar Pichai",
       "published_at": "2023-10-25"
     }
     ```

   - **Response:**
     ```json
     {
       "message": "Book created successfully",
       "data": {
         "id": 1,
         "title": "5 Minute to Learn Go",
         "author": "Sundar Pichai",
         "published_at": "2023-10-25",
         "created_at": "2024-11-21T10:23:36.565Z",
         "updated_at": "2024-11-21T10:23:36.565Z"
       }
     }
     ```

---

### 2. **Retrieve All Books**
   **GET** `/api/books`

   - **Response:**
     ```json
     {
       "message": "Books retrieved successfully",
       "data": [
         {
           "id": 2,
           "author": "Sundar Pichai",
           "created_at": "2024-11-21T10:15:27.526Z",
           "published_at": "2023-10-25",
           "title": "5 Minute to Learn Go",
           "updated_at": "2024-11-21T10:15:27.526Z"
         }
       ]
     }
     ```

---

### 3. **Update a Book**
   **PUT** `/api/books/:id`

   - **Request Body:**
     ```json
     {
       "title": "Updated Title"
     }
     ```

   - **Response:**
     ```json
     {
       "message": "Book updated successfully",
       "data": {
         "id": 2,
         "title": "Updated Title",
         "author": "Sundar Pichai",
         "published_at": "2023-10-25",
         "created_at": "2024-11-21T10:15:27.526Z",
         "updated_at": "2024-11-21T10:25:26.161Z"
       }
     }
     ```

---

### 4. **Delete a Book**
   **DELETE** `/api/books/:id`

   - **Response:**
     ```json
     {
       "message": "Delete successful"
     }
     ```

---

### 5. **Search for a Book**
   **GET** `/api/books/:id`

   - **Response (Book Found):**
     ```json
     {
       "data": {
         "id": 1,
         "title": "Book Title",
         "author": "Author Name",
         "published_at": "YYYY-MM-DD",
         "created_at": "2024-11-21T12:00:00Z",
         "updated_at": "2024-11-21T12:00:00Z"
       }
     }
     ```

   - **Response (Book Not Found):**
     ```json
     {
       "message": "Book not found"
     }
     ```

---

## Usage

### Test the API
You can test the API using tools like **Postman** or **cURL**.

Example using `curl`:
- **Create a Book:**
  ```bash
  curl -X POST http://localhost:3000/api/books   -H "Content-Type: application/json"   -d '{"title": "Book Title", "author": "Author Name", "published_at": "2024-11-21"}'
  ```

- **Get All Books:**
  ```bash
  curl http://localhost:3000/api/books
  ```

- **Update a Book:**
  ```bash
  curl -X PUT http://localhost:3000/api/books/1   -H "Content-Type: application/json"   -d '{"title": "Updated Title"}'
  ```

- **Delete a Book:**
  ```bash
  curl -X DELETE http://localhost:3000/api/books/1
  ```

- **Search for a Book:**
  ```bash
  curl http://localhost:3000/api/books/1
  ```

---

## Live Demo

You can try the live demo of this API hosted on Vercel at:
[GDGOC-BOOK-API Live Demo](https://vercel.com/mbudis23s-projects/gdgoc-book-api)

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute it as needed.

---

Happy coding! 🎉
