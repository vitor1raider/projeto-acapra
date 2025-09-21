const prisma = require('../../prisma/prisma.js')
const bcrypt = require('bcrypt')

// Endpoint API - Criação de usuários
exports.criarUsuario = async (req, res) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.senha, saltRounds);

  await prisma.Usuario.create({
    data: {
      email: req.body.email,
      nome: req.body.nome,
      senha: hashedPassword,
      status: req.body.status
    }
  })

  res.status(201).json(req.body)
}

// Consulta todos os usuários cadastrados
exports.obterUsuario = async (req, res) => {
  const usuarios = await prisma.usuario.findMany()
  res.status(201).json(usuarios)
}