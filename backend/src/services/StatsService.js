const { calculateStats } = require("../utils/stats");
const itemsService = require("./ItemsService");

class StatsService {
  constructor() {
    this.cache = null;
    this.lastCalculated = null;
    this.initPromise = this.initialize();
  }

  async initialize() {
    try {
      await itemsService.ensureInitialized();
      await this.recalculateStats();
      console.log("StatsService initialized successfully");
    } catch (error) {
      console.error("Failed to initialize StatsService:", error.message);
    }
  }

  async ensureInitialized() {
    await this.initPromise;
  }

  async getOverallStats() {
    await this.ensureInitialized();
    if (!this.cache || this.isStale()) {
      await this.recalculateStats();
    }

    return this.cache;
  }

  async recalculateStats() {
    try {
      const items = await itemsService.getAllItems();
      this.cache = calculateStats(items);
      this.lastCalculated = new Date();
    } catch (error) {
      throw new Error(`Failed to calculate stats: ${error.message}`);
    }
  }

  isStale() {
    if (!this.lastCalculated || !this.cache) {
      return true;
    }

    return (
      itemsService.isStale() ||
      (itemsService.lastModified &&
        itemsService.lastModified > this.lastCalculated)
    );
  }
}

const statsService = new StatsService();
module.exports = statsService;
