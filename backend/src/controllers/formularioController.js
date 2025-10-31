const prisma = require('../../prisma/prisma.js')
const path = require('path');

exports.formulario = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../frontend/html', 'formulario.html'))
}

// Função para criar um novo formulário de adoção
exports.criarFormulario = async (req, res) => {
  try {
    const novoFormulario = await prisma.FormularioAdocao.create({
      data: {
        nomeCompleto: req.body.nomeCompleto,
        telefoneContato: parseInt(req.body.telefoneContato),
        idade: parseInt(req.body.idade),
        animalInteresse: req.body.animalInteresse,
        enderecoCompleto: req.body.enderecoCompleto,
        moradia: req.body.moradia,
        renda: parseInt(req.body.renda),
        possuiOutrosAnimais: req.body.possuiOutrosAnimais,
        condicoesManterAnimal: req.body.condicoesManterAnimal,
        telasProtecao: req.body.telasProtecao === 'sim' ? 'Sim' : 'Não',
        acessoRua: req.body.acessoRua === 'sim' ? 'Sim' : 'Não',
        animaisCastradosVacinados: req.body.animaisCastradosVacinados === 'sim' ? 'Sim' : 'Não',
        todosConcordamAdocao: req.body.todosConcordamAdocao === 'sim' ? 'Sim' : 'Não',
        concordaCastracaoObrigatoria: req.body.concordaCastracaoObrigatoria === 'sim' ? 'Sim' : 'Não',
        concordaTaxaAdocao: req.body.concordaTaxaAdocao === 'sim' ? 'Sim' : 'Não',
      },
    });
    res.status(201).json({
      mensagem: "Formulário enviado com sucesso!",
      data: novoFormulario
    });
  } catch (error) {
    console.error("Erro ao salvar formulário", error);
    res.status(500).json({ mensagem: "Erro ao salvar formulário" });
  }
};