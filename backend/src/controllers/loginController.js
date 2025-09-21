const path = require('path');
const prisma = require('../../prisma/prisma.js')
const bcrypt = require('bcrypt')

// Carrega a página login.html
exports.login = (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../../frontend/html', 'login.html'))
}

// Validação das credenciais do usuário
exports.validarLogin = async (req, res) => {
	try {
		const { email, senha } = req.body;
		const usuario = await prisma.Usuario.findUnique({
			where: { email }
		});

		// Verificar se o usuário existe
		if (!usuario) {
			return res.status(401).json({ mensagem: 'Usuário não encontrado' });
		}

		// Comopara a senha informada com a senha criptografada do banco
		const senhaValida = await bcrypt.compare(senha, usuario.senha);

		if (!senhaValida) {
			return res.status(401).json({ mensagem: 'Senha incorreta' });
		}

		res.status(200).json({
			mensagem: 'Login realizado com sucesso'
		})
	} catch (error) {
		console.error('Erro no login: ', error)
	}
};