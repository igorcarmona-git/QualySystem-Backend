const prisma = require('../database/connection/connection.js');

module.exports = {

    async CreateSetores(req, res) {
        try {
            const { descricao, id_usuario_resp, diretoria } = req.body;

            const setor = await prisma.setores.create({
                data: {
                    descricao,
                    id_usuario_resp,
                    diretoria
                }
            });

            return res.status(201).json({ message: 'Inserido com sucesso!', setor });
        } catch (error) {
            console.error('Erro ao inserir setor:', error);
            return res.status(500).json({ message: 'Erro ao inserir', error });
        }
    },
    
    async getAllSetores(req, res) {
        try {
            const setores = await prisma.setores.findMany();
            return res.json(setores);
        } catch (error) {
            console.error('Erro ao buscar setores:', error);
            return res.status(500).json({ message: 'Erro ao buscar setores', error });
        }
    },

    async getsetor(req, res) {
        try {
            const { id } = req.body;
            const setor = await prisma.setores.findUnique({ where: { id } });
            return res.json(setor);
        } catch (error) {
            console.error('Erro ao buscar setor:', error);
            return res.status(500).json({ message: 'Erro ao buscar setor', error });
        }
    },

    async updateSetores(req, res) {
        try {
            const { id, descricao, id_usuario_resp, diretoria } = req.body;

            const setorAtualizado = await prisma.setores.update({
                where: { id },
                data: {
                    descricao,
                    id_usuario_resp,
                    diretoria
                }
            });

            return res.status(200).json({ message: 'Alterado com sucesso!', setorAtualizado });
        } catch (error) {
            console.error('Erro ao atualizar setor:', error);
            return res.status(500).json({ message: 'Erro ao atualizar setor', error });
        }
    },

    async deleteSetor(req, res) {
        try {
            const { id } = req.body;
            await prisma.setores.delete({ where: { id } });
            return res.status(200).json({ message: 'Deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar setor:', error);
            return res.status(500).json({ message: 'Erro ao deletar setor', error });
        }
    }
};
