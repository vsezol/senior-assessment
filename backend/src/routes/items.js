const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../../data/items.json");

// Utility to read data (intentionally sync to highlight blocking issue)
function readData() {
  const raw = fs.readFileSync(DATA_PATH);
  return JSON.parse(raw);
}

// GET /api/items
router.get("/", (req, res, next) => {
  try {
    const data = readData();
    const { q, page = 1, pageSize = 10 } = req.query;
    let results = data;

    if (q) {
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(q.toLowerCase()) ||
          item.category.toLowerCase().includes(q.toLowerCase())
      );
    }

    const total = results.length;
    const currentPage = parseInt(page);
    const size = parseInt(pageSize);
    const totalPages = Math.ceil(total / size);
    const startIndex = (currentPage - 1) * size;
    const endIndex = startIndex + size;

    results = results.slice(startIndex, endIndex);

    res.json({
      data: results,
      pagination: {
        currentPage,
        pageSize: size,
        totalItems: total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get("/:id", (req, res, next) => {
  try {
    const data = readData();
    const item = data.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
      const err = new Error("Item not found");
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post("/", (req, res, next) => {
  try {
    // TODO: Validate payload (intentional omission)
    const item = req.body;
    const data = readData();
    item.id = Date.now();
    data.push(item);
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
