
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;

    if (jsonResponse != "true") {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/formLoginUsuario');   
    } else {
        return next();
    }
}

helpers.verifyToken = (req, res, next) => {

    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;

    if (jsonResponse == "true") {

        //Authorization: Bearer <token>
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(" ")[1]
            req.token = token;
            next();
        } else {
            res.sendStatus(403);
        }

    } else {
        next();
    }
}

module.exports = helpers;