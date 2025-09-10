const fs = require("fs").promises;
const path = require("path");

class ItemsService {
  constructor() {
    this.cache = null;
    this.lastModified = null;
    this.DATA_PATH = path.join(__dirname, "../../../data/items.json");
    this.initPromise = this.initialize();
  }

  async initialize() {
    try {
      await this.loadData();
      console.log("ItemsService initialized successfully");
    } catch (error) {
      console.error("Failed to initialize ItemsService:", error.message);
    }
  }

  async ensureInitialized() {
    await this.initPromise;
  }

  async loadData() {
    try {
      const stats = await fs.stat(this.DATA_PATH);

      if (
        !this.cache ||
        !this.lastModified ||
        stats.mtime > this.lastModified
      ) {
        const raw = await fs.readFile(this.DATA_PATH, "utf8");
        this.cache = JSON.parse(raw);
        this.lastModified = stats.mtime;
      }

      return this.cache;
    } catch (error) {
      throw new Error(`Failed to load items data: ${error.message}`);
    }
  }

  async getAllItems() {
    await this.ensureInitialized();
    if (!this.cache) {
      await this.loadData();
    }
    return this.cache;
  }

  async getItemById(id) {
    const items = await this.getAllItems();
    return items.find((item) => item.id === parseInt(id));
  }

  async searchItems(query) {
    const items = await this.getAllItems();
    const searchTerm = query.toLowerCase();

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
  }

  isStale() {
    return !this.cache || !this.lastModified;
  }
}

const itemsService = new ItemsService();
module.exports = itemsService;
