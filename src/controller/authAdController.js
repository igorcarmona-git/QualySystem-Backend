const { PrismaClient } = require('@prisma/client');
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ad = require("../config/activeDirectory.js");
const prisma = new PrismaClient();

exports.user_authenticate = async (req, res) => {
    const { user, pass, domain } = req.body;
    
    const userDomain = domain && domain.trim() !== "" ? domain : null;

    try {
        const existingUser = await prisma.usuario.findUnique({ where: { user } });

        if (existingUser && (await bcrypt.compare(pass, existingUser.senha))) {
            const token = jsonwebtoken.sign(
                { user: JSON.stringify(user) }, 
                process.env.PRIVATE_KEY,
                { expiresIn: '60m' }
            );

            const encryptedData = await bcrypt.hash(JSON.stringify({
                message: "Autenticado!",
                id_user: existingUser.id,
                user: user,
                token: token
            }), 10);

            return res.status(200).json({ encryptedData });
        }

        if (userDomain) {
            await ad.authenticate(`${user}@${userDomain}`, pass, async function (err, auth) {
                if (auth) {
                    const hashedPassword = await bcrypt.hash(pass, 10);
                    const newUser = await prisma.usuario.create({
                        data: { user, senha: hashedPassword }
                    });
                    
                    const token = jsonwebtoken.sign(
                        { user: JSON.stringify(user) },
                        process.env.PRIVATE_KEY,
                        { expiresIn: '60m' }
                    );

                    const encryptedData = await bcrypt.hash(JSON.stringify({
                        message: "Autenticado!",
                        id_user: newUser.id,
                        user: user,
                        token: token
                    }), 10);

                    return res.status(200).json({ encryptedData });
                } else {
                    return res.status(401).json({ message: "Falha na autenticação!", error: err });
                }
            });
        } else {
            return res.json({ message: "Login interno" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Erro ao autenticar", error: err });
    }
};
