const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async CreateUsuario(req, res) {
        const { user, senha, email, telefone } = req.body;
        try {
            const newUser = await prisma.usuario.create({
                data: { user, senha, email, telefone }
            });
            return res.status(200).json({ message: 'Inserido com sucesso!', usuario: newUser });
        } catch (error) {
            console.error('Erro ao inserir usuário:', error);
            return res.status(500).json({ message: 'Erro ao inserir usuário', error });
        }
    },

    async getAllUsuarios(req, res) {
        try {
            const usuarios = await prisma.usuario.findMany();
            return res.json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return res.status(500).json({ message: 'Erro ao buscar usuários', error });
        }
    },

    async getUsuario(req, res) {
        const { id } = req.body;
        try {
            const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            return res.json(usuario);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            return res.status(500).json({ message: 'Erro ao buscar usuário', error });
        }
    },

    async updateUsuario(req, res) {
        const { id, user, senha, email, telefone } = req.body;
        try {
            const updatedUser = await prisma.usuario.update({
                where: { id: Number(id) },
                data: { user, senha, email, telefone }
            });
            return res.status(200).json({ message: 'Alterado com sucesso!', usuario: updatedUser });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
        }
    }
};
