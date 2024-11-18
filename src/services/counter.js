// Lokasi: /services/counter.js

const db = require('../config/firebaseConfig');

const getNewId = async () => {
  const ref = db.ref('bookCounter');
  const snapshot = await ref.once('value');
  const currentCount = snapshot.val() || 0;
  await ref.set(currentCount + 1);
  return currentCount + 1; // Return the new incremented ID
};

module.exports = getNewId; // Pastikan ini cocok
