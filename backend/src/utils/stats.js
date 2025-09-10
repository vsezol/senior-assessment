const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const calculateStats = (items) => {
  if (!items || items.length === 0) {
    return {
      total: 0,
      averagePrice: 0,
      categories: {},
      inStockCount: 0,
      outOfStockCount: 0,
    };
  }

  const total = items.length;
  const averagePrice =
    Math.round(mean(items.map((item) => item.price)) * 100) / 100;

  const categories = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const inStockCount = items.filter((item) => item.inStock).length;
  const outOfStockCount = total - inStockCount;

  return {
    total,
    averagePrice,
    categories,
    inStockCount,
    outOfStockCount,
  };
};

module.exports = {
  mean,
  calculateStats,
};
