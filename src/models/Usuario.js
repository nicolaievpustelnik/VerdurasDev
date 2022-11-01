class Usuario {

    constructor(id, nombre, apellido, email, password) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.password = password
    }

    getLegajo() {
        return this.legajo;
    }

}

module.exports = Usuario;