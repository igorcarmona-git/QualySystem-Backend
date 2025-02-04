const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async CreateEvento(req, res) {
        try {
            const { titulo } = req.body;
            
            const evento = await prisma.evento.create({
                data: { titulo }
            });

            return res.status(201).json({ message: 'Inserido com sucesso!', evento });
        } catch (error) {
            console.error('Erro ao inserir evento:', error);
            return res.status(500).json({ message: 'Erro ao inserir evento', error });
        }
    },
    
    async getAllEventos(req, res) {
        try {
            const eventos = await prisma.evento.findMany();
            return res.json(eventos);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
            return res.status(500).json({ message: 'Erro ao buscar eventos', error });
        }
    },

    async geteventoEspecifico(req, res) {
        try {
            const { id } = req.body;
            const evento = await prisma.evento.findUnique({
                where: { id: Number(id) }
            });
            
            if (!evento) {
                return res.status(404).json({ message: 'Evento não encontrado' });
            }

            return res.json(evento);
        } catch (error) {
            console.error('Erro ao buscar evento específico:', error);
            return res.status(500).json({ message: 'Erro ao buscar evento', error });
        }
    },

    async updateEvento(req, res) {
        try {
            const { id, titulo } = req.body;
            
            const evento = await prisma.evento.update({
                where: { id: Number(id) },
                data: { titulo }
            });
            
            return res.status(200).json({ message: 'Alterado com sucesso!', evento });
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            return res.status(500).json({ message: 'Erro ao atualizar evento', error });
        }
    },

    async deleteEvento(req, res) {
        try {
            const { id } = req.body;
            
            await prisma.evento.delete({
                where: { id: Number(id) }
            });
            
            return res.status(200).json({ message: 'Evento deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar evento:', error);
            return res.status(500).json({ message: 'Erro ao deletar evento', error });
        }
    }
};
