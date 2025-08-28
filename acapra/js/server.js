import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

// Converte o caminho do arquivo atual 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000;

app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());


// Gerenciamento de rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'acapra', 'index.html'))
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dadosAdm.html'))
})

app.get('/cadastrar', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'cadastrarAnimal.html'))
})

// Endpoint API - Dados dos usuárioss
app.post('/usuarios', async (req, res) => {
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
})

// Endpoint API - Dados dos animais cadastrados
app.post('/animais', async (req, res) => {
    await prisma.Animais.create({
        data: {
            nome: req.body.nome,
            especie: req.body.especie,
            sexo: req.body.sexo,
            castracao: req.body.castracao,
            vacina: req.body.vacina,
            idade: req.body.idade,
            porte: req.body.porte,
            status: req.body.status,
            data_resgate: req.body.data_resgate,
            observacoes: req.body.observacoes,
            obersavacoes_medicas: req.body.obersavacoes_medicas,
            raca: req.body.raca,
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {
    const users = await prisma.usuario.findMany()
    res.status(201).json(users)
})

app.get('/animais', async (req, res) => {
    const animais = await prisma.animais.findMany()
    res.status(201).json(animais)
})

app.listen(port)
