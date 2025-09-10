const express = require("express");
const router = express.Router();
const itemsService = require("../services/ItemsService");

router.get("/", async (req, res, next) => {
  try {
    const { q, page = 1, pageSize = 10 } = req.query;
    let results;

    if (q) {
      results = await itemsService.searchItems(q);
    } else {
      results = await itemsService.getAllItems();
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

router.get("/:id", async (req, res, next) => {
  try {
    const item = await itemsService.getItemById(req.params.id);
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

module.exports = router;
