const { Router } = require('express');
const router = Router();

const { renderIndex, renderIniciarSesion } = require('../controllers/index.controller');

router.get('/', renderIndex);

router.get('/iniciarSesion', renderIniciarSesion);

module.exports = router;