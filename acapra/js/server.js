import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import animais from './animais.js'; 

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

// Endpoint API - Dados dos animais cadastrados
app.get('/api/dadosAnimais', (req, res) => {
    res.json(animais);
})

app.listen(port)
