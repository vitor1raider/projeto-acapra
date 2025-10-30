const express = require('express')
const route = express.Router()
const upload = require('./config/multer');
const homeController = require('./src/controllers/homeController')
const animalController = require('./src/controllers/animalController')
const adminController = require('./src/controllers/adminController')
const loginController = require('./src/controllers/loginController')
const usuarioController = require('./src/controllers/usuarioController')
const formularioController = require('./src/controllers/formularioController')

// Endpoint - Página inicial
route.get('/', homeController.paginaInicial)

// Endpoint - Animal
route.post('/animais', upload.single('imagem'), animalController.criarAnimal)
route.get('/animais', animalController.listarAnimais);
route.get('/animais/:id_animal', animalController.consultarAnimalID)
route.delete('/animais/:id_animal', animalController.deletarAnimal);

// Endpoint para editar um animal cadastrado
route.put('/animais/:id_animal', upload.single('imagem'), animalController.editarAnimal);

// Endpoint - Painel administração
route.get('/admin', adminController.painelAdministracao)
route.get('/cadastrar', adminController.animaisCadastrados)

// Endpoint - Usuários
route.post('/usuarios', usuarioController.criarUsuario)
route.get('/usuarios', usuarioController.obterUsuario)

// Endpoint - Sistema de login
route.post('/login', loginController.validarLogin)
route.get('/login', loginController.login)

// Endpoint - Formulário de adoção
route.post('/formulario', formularioController.criarFormulario)
route.get('/formulario', formularioController.formulario)

module.exports = route