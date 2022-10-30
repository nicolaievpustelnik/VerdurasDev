const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderIniciarSesion = (req, res) => {
    res.render('iniciarSesion')
};

indexCtrl.renderStock = (req, res) => {
    res.render('stock')
};

module.exports = indexCtrl;