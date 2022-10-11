const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderIniciarSesion = (req, res) => {
    res.render('iniciarSesion')
};

module.exports = indexCtrl;