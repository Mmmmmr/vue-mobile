module.exports = {
  pages: {
    index: {
      entry: 'src/pages/index/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    compose: {
      entry: 'src/pages/compose/main.js',
      template: 'public/compose.html',
      filename: 'compose.html'
    }
  }
}