const fs = require('fs');  
const prisma = require('../../prisma/prisma.js')
const path = require('path')

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
        idade: req.body.idade,
        sobre: req.body.sobre,
        imagem: req.file ? req.file.filename : null
      }
    });
    res.status(201).json(novoAnimal);
  } catch (error) {
    console.log("Erro ao salvar animal", error)
    res.status(500).json({ mensagem: "Erro ao salvar animal" });
  }
}

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
