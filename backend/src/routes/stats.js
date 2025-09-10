const express = require("express");
const router = express.Router();
const statsService = require("../services/StatsService");

router.get("/", async (req, res, next) => {
  try {
    const stats = await statsService.getOverallStats();
    res.json(stats);
  } catch (err) {
    console.error("Error getting stats:", err);
    next(err);
  }
});

module.exports = router;
