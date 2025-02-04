const connection = require('../database/connection/connection.js')
module.exports = {

    async CreateTpNotificacao(req, res){
         const {codigo,titulo } = req.body

        var Data = {codigo, titulo}  
        
        var conect = await connection('tp_notificacao').insert(Data)   
        
        if(conect){
            return(res.status(200).json('Tipo inserido com sucesso!'))
        }else{
            return res.status(500).json('Erro ao inserir')
        } 
    },
    
    async getAlltipos(req,res){
        var conect = await connection('tp_notificacao').select('*');    
        return res.json(conect);
    },

    async getTipoNotificcao(req,res){
        const {id} = req.body

        var conect = await connection('tp_notificacao').where('id', id).select('*');    
        return res.json(conect);
    },

    async updateTipoNotificacao(req, res){
        const {id, codigo,titulo } = req.body

            var conect = await connection('tp_notificacao')
            .where('id', id)
            .update('codigo',codigo)
            .update('titulo',titulo)

            if(conect){
                return(res.status(200).json('Tipo alterado com sucesso!'))
            }else{
                return res.status(500).json('Erro ao inserir')
            } 

    }

}