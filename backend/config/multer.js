const multer = require('multer');
const path = require('path');

// Configuração de armazenação
const storage = multer.diskStorage({
  // Pasta de upload das imagens
  destination: function (req, file, cb) {
    const pastaUpload = path.join(__dirname, '../uploads');
    cb(null, pastaUpload);
  },
  // Nome do arquivo
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = upload;