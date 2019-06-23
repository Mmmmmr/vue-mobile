module.exports = {
  pages: {
    index: {
      entry: "src/pages/index/main.js",
      template: "src/pages/index/index.html",
      filename: "index.html"
    },
    category: {
      entry: "src/pages/category/main.js",
      template: "src/pages/category/category.html",
      filename: "category.html"
    },
    search: {
      entry: "src/pages/search/main.js",
      template: "src/pages/search/search.html",
      filename: "search.html"
    },
    goods: {
      entry: "src/pages/goods/main.js",
      template: "src/pages/goods/goods.html",
      filename: "goods.html"
    }
  }
};
