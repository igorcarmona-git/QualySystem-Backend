const express = require('express');
const routes = express.Router();

// Controllers
const authenticate = require('./controller/authAdController.js');
const authToken = require('./authToken.js');
const CrudNotificacao = require('./controller/crudNotificacao.js');
const CrudEventos = require('./controller/crudEventos.js');
const CrudDiretorias = require('./controller/crudDiretorias.js');
const CrudSetores = require('./controller/crudSetores.js');
const CrudTarefas = require('./controller/crudTarefas.js');
const CrudUsuarios = require('./controller/crudUsuario.js');

// Authentication Route
routes.post('/authenticate', authenticate.userAuthenticate);

// Middleware for Token Validation
routes.use(authToken.tokenValidated);

// Notificações
routes.post('/createNotificacao', CrudNotificacao.CreateNotificacao);
routes.get('/buscaNotificacoes', CrudNotificacao.getAllNotificacoes);
routes.get('/buscaNotificacoes', CrudNotificacao.getNotificacoes);
routes.put('/updateNotificacao', CrudNotificacao.updateNotificacao);
routes.delete('/deleteNotificacao', CrudNotificacao.deleteNotificacao);

// Eventos
routes.post('/createEvento', CrudEventos.CreateEvento);
routes.get('/buscaEventos', CrudEventos.getAllEventos);
routes.get('/buscaEventos', CrudEventos.geteventoEspecifico);
routes.put('/updateEvento', CrudEventos.updateEvento);
routes.delete('/deleteEvento', CrudEventos.deleteEvento);

// Diretorias
routes.post('/createDiretoria', CrudDiretorias.CreateDiretoria);
routes.get('/buscaDiretorias', CrudDiretorias.getAllDiretorias);
routes.get('/buscaDiretorias', CrudDiretorias.getDiretoria);
routes.put('/updateDiretoria', CrudDiretorias.updateDiretoria);

// Setores
routes.post('/createSetor', CrudSetores.CreateSetores);
routes.get('/buscaSetores', CrudSetores.getAllSetores);
routes.get('/buscaSetores', CrudSetores.getsetor);
routes.put('/updateSetor', CrudSetores.updateSetores);
routes.delete('/deleteSetor', CrudSetores.deleteSetor);

// Tarefas
routes.post('/createTarefa', CrudTarefas.CreateTarefa);
routes.get('/buscaTarefas', CrudTarefas.getAllTarefas);
routes.get('/buscaTarefas', CrudTarefas.getTarefa);
routes.put('/updateTarefa', CrudTarefas.updateTarefa);
routes.delete('/deleteTarefa', CrudTarefas.deleteTarefa);

// Usuarios
routes.post('/createUsuario', CrudUsuarios.CreateUsuario);
routes.get('/buscaUsuarios', CrudUsuarios.getAllUsuarios);
routes.get('/buscaUsuarios', CrudUsuarios.getUsuario);
routes.put('/updateUsuario', CrudUsuarios.updateUsuario);

module.exports = routes;