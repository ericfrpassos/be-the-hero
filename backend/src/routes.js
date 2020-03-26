const express = require('express');
const OngController = require('../src/Controllers/OngController')
const IncidentController = require('../src/Controllers/IncidentController')
const ProfileController = require('../src/Controllers/ProfileController')
const SessionController = require('../src/Controllers/SessionController')

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.get('/profile', ProfileController.index);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;