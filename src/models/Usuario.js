class Usuario {

    constructor(id, legajo, nombre, apellido, email, password) {
        this.id = id
        this.legajo = legajo
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.password = password
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
}

module.exports = Usuario;