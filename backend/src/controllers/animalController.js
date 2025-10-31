const fs = require('fs');
const prisma = require('../../prisma/prisma.js')
const path = require('path');
const { Porte } = require('@prisma/client');

// Endpoint API - Dados dos animais cadastrados
exports.criarAnimal = async (req, res) => {
  try {
    const novoAnimal = await prisma.Animais.create({
      data: {
        nome: req.body.nome,
        especie: req.body.especie,
        sexo: req.body.sexo,
        castracao: req.body.castracao,
        vacina: req.body.vacina,
        idade: req.body.idade.toString(), // Converte para string
        sobre: req.body.sobre,
        porte: req.body.porte,
        imagem: req.file ? req.file.filename : null,
      },
    });
    res.status(201).json(novoAnimal);
  } catch (error) {
    console.error("Erro ao salvar animal", error);
    res.status(500).json({ mensagem: "Erro ao salvar animal" });
  }
}

// Função para editar um animal cadastrado
exports.editarAnimal = async (req, res) => {
  try {
    const { id_animal } = req.params;

    // Verifica se o animal existe
    const animalExistente = await prisma.Animais.findUnique({
      where: { id_animal },
    });

    console.log(animalExistente)
    if (!animalExistente) {
      return res.status(404).json({ mensagem: "Animal não encontrado" });
    }

    console.log('Corpo da requisição:', JSON.stringify(req.body));

    const dadosAtualizados = {
      nome: req.body.nome,
      especie: req.body.especie,
      sexo: req.body.sexo,
      castracao: req.body.castracao,
      vacina: req.body.vacina,
      idade: req.body.idade.toString(), // Converte para string
      sobre: req.body.sobre,
      porte: req.body.porte,
    };

    if (req.file) {
      dadosAtualizados.imagem = req.file.filename;
    }

    const animalAtualizado = await prisma.Animais.update({
      where: { id_animal },
      data: dadosAtualizados,
    })

    res.status(200).json(animalAtualizado);
    console.log(dadosAtualizados)
    console.log(animalAtualizado)
  } catch (error) {
    console.error("Erro ao editar animal:", error);
    res.status(500).json({ mensagem: "Erro ao editar animal" });
  }
};
// Consulta todos os animais cadastrados
exports.obterAnimais = async (req, res) => {
  const animaisCadastrados = await prisma.Animais.findMany()
  res.status(200).json(animaisCadastrados)
}

// Consulta o animal com base no ID
exports.consultarAnimalID = async (req, res) => {
  try {
    const { id_animal } = req.params
    const animal = await prisma.Animais.findUnique({
      where: { id_animal }
    })
    if (animal) {
      res.json(animal)
    }
  } catch (error) {
    console.log("Erro ao consultar pelo ID", error)
    res.status(500).json({ mensagem: "Erro ao consultar pelo ID" });
  }
}
// Lista animais aplicando filtros opcionais via query string
exports.listarAnimais = async (req, res) => {
  try {
    // campos esperados: tipo, sexo, porte
    const allowed = ['especie', 'sexo', 'porte'];
    const where = {};

    allowed.forEach(k => {
      if (req.query[k] && req.query[k] !== 'selecione') {
        // normalizar caso necessário: .toLowerCase(), etc.
        where[k] = req.query[k];
      }
    });

    const animais = await prisma.Animais.findMany({ where });
    return res.json(animais);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}

// Deletar um animal cadastrado
exports.deletarAnimal = async (req, res) => {
  try {
    const { id_animal } = req.params;
    const animal = await prisma.Animais.findUnique({
      where: { id_animal },
    });

    await prisma.Animais.delete({
      where: { id_animal },
    });

    // Remover a imagem do animal de uploads
    if (animal.imagem) {
      const caminhoImagem = path.resolve(__dirname, '../../uploads', animal.imagem);

      fs.unlinkSync(caminhoImagem);
      console.log('Imagem removida:', animal.imagem);
    }
    res.status(200).json({ mensagem: 'Animal deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar animal:', error);
    res.status(500).json({ erro: 'Erro ao deletar animal' });
  }
};
