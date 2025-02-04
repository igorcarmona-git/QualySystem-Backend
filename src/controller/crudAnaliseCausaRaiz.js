const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async CreateCausaRaiz(req, res) {
        try {
            const {
                id_notificacao,
                discussaoMultiprofissional, 
                investigacaoRealizada, 
                maoObra,
                maquina,
                meioAmbiente,
                material,
                medida,
                metodo,
                id_planoAcao
            } = req.body;

            const newCausaRaiz = await prisma.analiseCausaRaiz.create({
                data: {
                    id_notificacao,
                    discussaoMultiprofissional, 
                    investigacaoRealizada, 
                    maoObra,
                    maquina,
                    meioAmbiente,
                    material,
                    medida,
                    metodo,
                    id_planoAcao
                }
            });
            
            return res.status(200).json({ message: 'Inserida com sucesso!', id: newCausaRaiz.id });
        } catch (error) {
            console.error('Erro ao inserir causa raiz:', error);
            return res.status(500).json({ message: 'Erro ao inserir notificação', error });
        }
    },
    
    async getAllCausaRaiz(req, res) {
        try {
            const causasRaiz = await prisma.analiseCausaRaiz.findMany();    
            return res.json(causasRaiz);
        } catch (error) {
            console.error('Erro ao buscar causas raiz:', error);
            return res.status(500).json({ message: 'Erro ao buscar dados', error });
        }
    },

    async getCausaRaiz(req, res) {
        try {
            const { id } = req.body;
            const causaRaiz = await prisma.analiseCausaRaiz.findUnique({
                where: { id: Number(id) }
            });
            return res.json(causaRaiz);
        } catch (error) {
            console.error('Erro ao buscar causa raiz:', error);
            return res.status(500).json({ message: 'Erro ao buscar dados', error });
        }
    },

    async updateCausaRaiz(req, res) {
        try {
            const {
                id,
                id_notificacao,
                discussaoMultiprofissional, 
                investigacaoRealizada, 
                maoObra,
                maquina,
                meioAmbiente,
                material,
                medida,
                metodo,
                id_planoAcao
            } = req.body;

            const updatedCausaRaiz = await prisma.analiseCausaRaiz.update({
                where: { id: Number(id) },
                data: {
                    id_notificacao,
                    discussaoMultiprofissional,
                    investigacaoRealizada,
                    maoObra,
                    maquina,
                    meioAmbiente,
                    material,
                    medida,
                    metodo,
                    id_planoAcao
                }
            });

            return res.status(200).json({ message: 'Alterado com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar causa raiz:', error);
            return res.status(500).json({ message: 'Erro ao atualizar notificação', error });
        }
    },

    async deleteCausaRaiz(req, res) {
        try {
            const { id } = req.body;
            await prisma.analiseCausaRaiz.delete({
                where: { id: Number(id) }
            });
            return res.status(200).json({ message: 'Excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao excluir causa raiz:', error);
            return res.status(500).json({ message: 'Erro ao excluir notificação', error });
        }
    }
};
