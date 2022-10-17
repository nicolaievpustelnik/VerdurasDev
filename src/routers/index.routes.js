const { Router } = require('express');
const router = Router();

const { renderIndex, renderIniciarSesion, renderStock } = require('../controllers/index.controller');

router.get('/', renderIndex);

router.get('/iniciarSesion', renderIniciarSesion);

router.get('/stock', renderStock);

module.exports = router;