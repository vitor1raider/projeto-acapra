const path = require('path');

// Carrega a página dadosAdm.html
exports.painelAdministracao = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../frontend/html', 'dadosAdm.html'))
}

// Carrega a página cadastrarAnimal.html
exports.animaisCadastrados = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../frontend/html', 'cadastrarAnimal.html'))
}