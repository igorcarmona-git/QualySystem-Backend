const prisma = require('../database/connection/connection.js');

module.exports = {
    async CreateDiretoria(req, res) {
        try {
            const { descricao, id_usuario_resp } = req.body;

            const novaDiretoria = await prisma.diretoria.create({
                data: { descricao, id_usuario_resp }
            });

            return res.status(201).json({ message: 'Inserido com sucesso!', diretoria: novaDiretoria });
        } catch (error) {
            console.error('Erro ao inserir diretoria:', error);
            return res.status(500).json({ message: 'Erro ao inserir', error });
        }
    },

    async getAllDiretorias(req, res) {
        try {
            const diretorias = await prisma.diretoria.findMany();
            return res.json(diretorias);
        } catch (error) {
            console.error('Erro ao buscar diretorias:', error);
            return res.status(500).json({ message: 'Erro ao buscar dados', error });
        }
    },

    async getDiretoria(req, res) {
        try {
            const { id } = req.body;
            const diretoria = await prisma.diretoria.findUnique({
                where: { id: Number(id) }
            });
            return res.json(diretoria);
        } catch (error) {
            console.error('Erro ao buscar diretoria:', error);
            return res.status(500).json({ message: 'Erro ao buscar dados', error });
        }
    },

    async updateDiretoria(req, res) {
        try {
            const { id, descricao, id_usuario_resp } = req.body;

            const updatedDiretoria = await prisma.diretoria.update({
                where: { id: Number(id) },
                data: { descricao, id_usuario_resp }
            });

            return res.status(200).json({ message: 'Alterada com sucesso!', diretoria: updatedDiretoria });
        } catch (error) {
            console.error('Erro ao atualizar diretoria:', error);
            return res.status(500).json({ message: 'Erro ao atualizar', error });
        }
    }
};