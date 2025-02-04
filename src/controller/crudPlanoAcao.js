const prisma = require('../database/connection/connection.js');

module.exports = {

    async CreatePlanoAcao(req, res) {
        try {
            const { oQue, porQue, onde, quem, quando, como, quanto } = req.body;

            const planoAcao = await prisma.planoAcao.create({
                data: { oQue, porQue, onde, quem, quando, como, quanto }
            });

            return res.status(200).json({ message: 'Inserido com sucesso!', planoAcao });
        } catch (error) {
            console.error('Erro ao inserir Plano de Ação:', error);
            return res.status(500).json({ message: 'Erro ao inserir', error });
        }
    },
    
    async getAllPlanoAcao(req, res) {
        try {
            const planosAcao = await prisma.planoAcao.findMany();    
            return res.json(planosAcao);
        } catch (error) {
            console.error('Erro ao buscar planos de ação:', error);
            return res.status(500).json({ message: 'Erro ao buscar dados', error });
        }
    },

    async getPlanoAcao(req, res) {
        try {
            const { id } = req.body;
            const planoAcao = await prisma.planoAcao.findUnique({
                where: { id: Number(id) }
            });    
            return res.json(planoAcao);
        } catch (error) {
            console.error('Erro ao buscar plano de ação:', error);
            return res.status(500).json({ message: 'Erro ao buscar dados', error });
        }
    },

    async updatePlanoAcao(req, res) {
        try {
            const { id, oQue, porQue, onde, quem, quando, como, quanto } = req.body;

            const planoAcao = await prisma.planoAcao.update({
                where: { id: Number(id) },
                data: { oQue, porQue, onde, quem, quando, como, quanto }
            });

            return res.status(200).json({ message: 'Alterado com sucesso!', planoAcao });
        } catch (error) {
            console.error('Erro ao atualizar Plano de Ação:', error);
            return res.status(500).json({ message: 'Erro ao atualizar', error });
        }
    },

    async deletePlanoAcao(req, res) {
        try {
            const { id } = req.body;

            await prisma.planoAcao.delete({
                where: { id: Number(id) }
            });

            return res.status(200).json({ message: 'Deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar Plano de Ação:', error);
            return res.status(500).json({ message: 'Erro ao deletar', error });
        }
    }
};