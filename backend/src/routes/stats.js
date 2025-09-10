const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

// GET /api/stats
router.get('/', (req, res, next) => {
  fs.readFile(DATA_PATH, (err, raw) => {
    if (err) {
      console.error('Error reading items file:', err);
      return next(err);
    }

    try {
      const items = JSON.parse(raw);
      const stats = {
        total: items.length,
        averagePrice: items.reduce((acc, cur) => acc + cur.price, 0) / items.length
      };

      res.json(stats);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return next(parseErr);
    }
  });
});

module.exports = router;