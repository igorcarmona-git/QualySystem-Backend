const express = require('express');
const routes = express.Router();

// Controllers
const authenticate = require('./controller/authAdController.js');
const authToken = require('./authToken.js');
const CrudNotificacao = require('./controller/crudNotificacao.js');
const CrudTpNotificacoes = require('./controller/crudTpNotificacao.js');
const CrudEventos = require('./controller/crudEventos.js');
const CrudDiretorias = require('./controller/crudDiretorias.js');
const CrudSetores = require('./controller/crudSetores.js');
const CrudTarefas = require('./controller/crudTarefas.js');
const CrudUsuarios = require('./controller/crudUsuario.js');

// Authentication Route
routes.post('/authenticate', authenticate.user_authenticate);

// Middleware for Token Validation
routes.use(authToken.tokenValited);

// Notificações
routes.post('/createNotificacao', CrudNotificacao.CreateNotificacao);
routes.get('/buscaNotificacoes', CrudNotificacao.getAllNotificacoes);
routes.post('/buscaNotificacoes', CrudNotificacao.getNotificacoes);
routes.put('/updateNotificacao', CrudNotificacao.updateNotificacao);

// Tipos de Notificação
routes.post('/createtpNotificacao', CrudTpNotificacoes.CreateTpNotificacao);
routes.get('/buscanotificacaoTotal', CrudTpNotificacoes.getAlltipos);
routes.post('/buscatiponotificacao', CrudTpNotificacoes.getTipoNotificcao);
routes.put('/updateTpNotificacao', CrudTpNotificacoes.updateTipoNotificacao);

// Eventos
routes.post('/createevento', CrudEventos.CreateEvento);
routes.get('/buscaeventos', CrudEventos.getAllEventos);
routes.post('/buscaeventoespecifico', CrudEventos.geteventoEspecfico);
routes.put('/updateEvento', CrudEventos.updateEvento);

// Diretorias
routes.post('/createDiretorias', CrudDiretorias.CreateDiretoria);
routes.get('/getAllDiretorias', CrudDiretorias.getAllDiretorias);
routes.post('/buscaDiretoriaespecifica', CrudDiretorias.getDiretoria);
routes.put('/updateDiretoria', CrudDiretorias.updateDiretoria);

// Setores
routes.post('/createSetores', CrudSetores.CreateSetores);
routes.get('/buscaSetores', CrudSetores.getAllSetores);
routes.post('/buscaSetorespecifico', CrudSetores.getsetor);
routes.put('/alteraSetores', CrudSetores.updateSetores);

// Tarefas
routes.post('/createTarefa', CrudTarefas.CreateTarefa);
routes.get('/buscaTarefas', CrudTarefas.getAllTarefas);
routes.post('/buscaTarefaEspecifica', CrudTarefas.getTarefa);
routes.put('/alteratarefa', CrudTarefas.updateTarefa);

// Plano de Ação
routes.post('/CreatePlanoAcao', CrudTarefas.CreateTarefa);
routes.get('/getAllPlanoAcao', CrudTarefas.getAllTarefas);
routes.post('/getPlanoAcao', CrudTarefas.getTarefa);
routes.put('/updatePlanoAcao', CrudTarefas.updateTarefa);

// Causa Raiz
routes.post('/CreateCausaRaiz', CrudTarefas.CreateTarefa);
routes.get('/getAllCausaRaiz', CrudTarefas.getAllTarefas);
routes.post('/getCausaRaiz', CrudTarefas.getTarefa);
routes.put('/updateCausaRaiz', CrudTarefas.updateTarefa);

// Usuários
routes.post('/Createusuario', CrudUsuarios.CreateUsuario);
routes.get('/getAllUsuarios', CrudUsuarios.getAllUsuarios);
routes.post('/getUsuario', CrudUsuarios.getUsuario);
routes.put('/updateUsuario', CrudUsuarios.updateUsuario);

module.exports = routes;