import express from 'express'

// import path from 'path'
// import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import cors from 'cors';

const prisma = new PrismaClient()
const app = express()
const port = 3000;

app.use(cors()); 
app.use(express.json());

// app.use(express.static(path.join(__dirname, '..')));
// // Gerenciamento de rotas
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'acapra', 'index.html'))
// });

// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'dadosAdm.html'))
// })

// app.get('/cadastrar', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'cadastrarAnimal.html'))
// })

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
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // 1. Buscar o usuário pelo e-mail
        const usuario = await prisma.Usuario.findUnique({
            where: { email }
        });

        // 2. Verificar se o usuário existe
        if (!usuario) {
            return res.status(401).json({ erro: 'Usuário não encontrado' });
        }

        // 3. Comparar a senha informada com a senha criptografada do banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }

        // 4. Se tudo OK, retorna sucesso (você pode gerar um token aqui se quiser)
        res.status(200).json({
            mensagem: 'Login realizado com sucesso',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                status: usuario.status
            }
        });

    } catch (erro) {
        console.error('Erro no login:', erro);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});

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
