const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async CreateNotificacao(req, res) {
        try {
            const {
                usuario_responsavel,
                dt_ocorrencia,
                hr_ocorrencia,
                nomePaciente,
                id_evento,
                sexo,
                raca_cor,
                idade,
                dt_internacao,
                status,
                id_tarefa,
                id_setor_notificante,
                id_setor_notificado,
                diagnostico,
                registro,
                grau_dano,
                titulo,
                descricao,
                envolvimento,
                anonimato
            } = req.body;

            const notificacao = await prisma.notificacao.create({
                data: {
                    usuario_responsavel,
                    dt_ocorrencia,
                    hr_ocorrencia,
                    nomePaciente,
                    id_evento,
                    sexo,
                    raca_cor,
                    idade,
                    dt_internacao,
                    status,
                    id_tarefa,
                    id_setor_notificante,
                    id_setor_notificado,
                    diagnostico,
                    registro,
                    grau_dano,
                    titulo,
                    descricao,
                    envolvimento,
                    anonimato
                }
            });

            return res.status(200).json({ message: 'Notificação inserida com sucesso!', notificacao });
        } catch (error) {
            console.error('Erro ao inserir notificação:', error);
            return res.status(500).json({ message: 'Erro ao inserir notificação', error });
        }
    },

    async getAllNotificacoes(req, res) {
        try {
            const notificacoes = await prisma.notificacao.findMany();
            return res.json(notificacoes);
        } catch (error) {
            console.error('Erro ao buscar notificações:', error);
            return res.status(500).json({ message: 'Erro ao buscar notificações', error });
        }
    },

    async getNotificacoes(req, res) {
        try {
            const { id } = req.body;
            const notificacao = await prisma.notificacao.findUnique({ where: { id } });
            return res.json(notificacao);
        } catch (error) {
            console.error('Erro ao buscar notificação:', error);
            return res.status(500).json({ message: 'Erro ao buscar notificação', error });
        }
    },

    async updateNotificacao(req, res) {
        try {
            const { id, ...updateData } = req.body;
            const notificacao = await prisma.notificacao.update({
                where: { id },
                data: updateData
            });

            return res.status(200).json({ message: 'Notificação alterada com sucesso!', notificacao });
        } catch (error) {
            console.error('Erro ao atualizar notificação:', error);
            return res.status(500).json({ message: 'Erro ao atualizar notificação', error });
        }
    },

    async deleteNotificacao(req, res) {
        try {
            const { id } = req.body;
            await prisma.notificacao.delete({ where: { id } });
            return res.status(200).json({ message: 'Notificação deletada com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar notificação:', error);
            return res.status(500).json({ message: 'Erro ao deletar notificação', error });
        }
    }
};
