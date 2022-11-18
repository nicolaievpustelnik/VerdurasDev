const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Empleado = require('../models/Empleado');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {

    // Validar mail existente
    const user = await Empleado.findOne({email});

    console.log(user)

    if(!user){
        return done(null, false, {message: "Admin invalido"});
    }else{
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }else{
            return done(null, false, {message: "Password incorrecto"})
        }
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    Empleado.findById(id, (err, user) => {
        done(err, user);
    });
});