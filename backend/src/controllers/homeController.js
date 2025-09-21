const path = require('path'); 

// Carrega a página index.html
exports.paginaInicial = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../frontend/html', 'index.html'))
}
