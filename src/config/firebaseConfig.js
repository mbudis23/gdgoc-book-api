const admin = require('firebase-admin');
const dotenv = require('dotenv')
dotenv.config()

const serviceAccount = require(process.env.PRIVATE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

module.exports = db;
