const jsonwebtoken = require("jsonwebtoken");

exports.tokenValidated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Acesso negado! Token de autenticação ausente." });
        }

        // Verifica se o token segue o padrão 'Bearer token_aqui'
        const [scheme, token] = authHeader.split(' ');

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ message: "Acesso negado! Token mal formatado." });
        }

        if (!process.env.PRIVATE_KEY) {
            console.error("Erro: Chave privada não configurada.");
            return res.status(500).json({ message: "Erro interno do servidor." });
        }

        // Verifica o token e extrai o payload
        const payload = jsonwebtoken.verify(token, process.env.PRIVATE_KEY);
        console.log("Payload decodificado:", payload);

        // Garante que o token tenha um usuário válido
        if (!payload.user) {
            return res.status(401).json({ message: "Token inválido! Usuário não encontrado." });
        }

        // Anexa o usuário ao objeto `req`
        req.user = payload.user;

        next();
    } catch (error) {
        console.error("Erro ao validar token:", error);

        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            return res.status(401).json({ message: "Token inválido ou expirado!" });
        }

        return res.status(500).json({ message: "Erro interno ao validar o token." });
    }
};
