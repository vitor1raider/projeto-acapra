const express = require('express')
const route = express.Router()
const upload = require('./config/multer');
const homeController = require('./src/controllers/homeController')
const animalController = require('./src/controllers/animalController')
const adminController = require('./src/controllers/adminController')
const loginController = require('./src/controllers/loginController')
const usuarioController = require('./src/controllers/usuarioController')

// Endpoint - Página inicial
route.get('/', homeController.paginaInicial)

// Endpoint - Animal
route.post('/animais', upload.single('imagem'), animalController.criarAnimal)
route.get('/animais', animalController.obterAnimais)
route.get('/animais/:id_animal', animalController.consultarAnimalID)
route.delete('/animais/:id_animal', animalController.deletarAnimal);

// Endpoint - Painel administração
route.get('/admin', adminController.painelAdministracao)
route.get('/cadastrar', adminController.animaisCadastrados)

// Endpoint - Usuários
route.post('/usuarios', usuarioController.criarUsuario)
route.get('/usuarios', usuarioController.obterUsuario)

// Endpoint - Sistema de login
route.post('/login', loginController.validarLogin)
route.get('/login', loginController.login)

module.exports = route