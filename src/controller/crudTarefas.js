const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async CreateTarefa(req, res) {
        try {
            const { descricao, dt_criacao, dt_venc, id_notificacao } = req.body;
            
            const tarefa = await prisma.tarefa.create({
                data: {
                    descricao,
                    dt_criacao,
                    dt_venc,
                    notificacao: { connect: { id: id_notificacao } } // Conectando com a Notificacao
                }
            });

            return res.status(200).json({ message: 'Inserida com sucesso!', tarefa });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao inserir', error });
        }
    },

    async getAllTarefas(req, res) {
        try {
            const tarefas = await prisma.tarefa.findMany();
            return res.json(tarefas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar tarefas', error });
        }
    },

    async getTarefa(req, res) {
        try {
            const { id } = req.body;
            const tarefa = await prisma.tarefa.findUnique({
                where: { id: parseInt(id) }
            });
            return res.json(tarefa);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar tarefa', error });
        }
    },

    async updateTarefa(req, res) {
        try {
            const { id, descricao, dt_criacao, dt_venc, id_notificacao } = req.body;
            
            const tarefa = await prisma.tarefa.update({
                where: { id: parseInt(id) },
                data: {
                    descricao,
                    dt_criacao,
                    dt_venc,
                    notificacao: { connect: { id: id_notificacao } }
                }
            });

            return res.status(200).json({ message: 'Alterada com sucesso!', tarefa });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
        }
    },

    async deleteTarefa(req, res) {
        try {
            const { id } = req.body;
            await prisma.tarefa.delete({ where: { id: parseInt(id) } });
            return res.status(200).json({ message: 'Deletada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar tarefa', error });
        }
    }
};
