const jsonwebtoken = require("jsonwebtoken");

exports.tokenValited = async (req, resp, next) => {
    try {
        if (!req.headers.authorization) {
            return resp.status(401).send('Acesso negado! Não existe token de autenticação');
        }

        const [token] = req.headers.authorization.split(' ') || [''];

        if (!token) {
            return resp.status(401).send('Acesso negado! Token não encontrado');
        }

        // Verifica o token usando a chave privada
        const payload = jsonwebtoken.verify(token, process.env.PRIVATE_KEY);
        console.log('Payload decodificado:', payload);

        // Verifica se o token contém um usuário válido
        if (!payload.user) {
            return resp.status(401).json({ message: "Token inválido" });
        }

        req.headers['user'] = payload.user;

        next();
    } catch (error) {
        console.error('Erro ao validar token:', error);
        return resp.status(401).json({ message: 'Token inválido!' });
    }
};