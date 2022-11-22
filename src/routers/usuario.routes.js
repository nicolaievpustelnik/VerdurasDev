const { Router } = require('express');
const router = Router();

const {isAuthenticated, verifyToken} = require('../helps/auth');

const {
    renderizarFormUsuario,
    crearUsuario,
    renderizarUsuarios,
    renderizadoActualizarFormUsuario,
    actualizarUsuario,
    eliminarUsuario,
    renderRegistrarUsuarioForm,
    registrarUsuario,
    renderLoginUsuarioForm,
    loginUsuario,
    cerrarSesionUsuario,
    auth,
    getUserByEmail
} = require('../controllers/usuario.controller');

/**
* @swagger
*    components:
*      schemas:
*        Usuario:
*          type: object
*          required:
*            - nombre
*            - apellido
*            - email
*            - password
*            - sucursal
*            - tipoUsuario
*            - rol
*          properties:
*            nombre:
*              type: string
*              description: Nombre de usuario.
*            apellido:
*              type: string
*              description: Apellido de usuario.
*            email:
*              type: string
*              description: Email de usuario.
*            password:
*              type: string
*              description: Password de usuario.
*            sucursal:
*              type: string
*              description: Sucursal de usuario.
*            tipoUsuario:
*              type: string
*              description: Tipo de Usuario.
*            rol:
*              type: array
*              items: {}
*              description: Roles del Usuario.
*          example:
*             nombre: Nicolaiev
*             apellido: Brito
*             email: nicolaievbrito@gmail.com
*             password: 123123123
*             sucursal: VerdurasDev
*             tipoUsuario: Empleado
*             rol: ["Cajero", "Organizador"]
*/


/**
 * @openapi
 * /auth:
 *   post:
 *     tags: 
 *       - Token
 *     description: Auth Token
 *     requestBody:
 *        required: true
 *        content: 
 *          application/json: 
 *            schema:
 *              type: object
 *              properties:
 *                 email:
 *                   type: 
 *                   example: nicolaievbrito@gmail.com
 *                 password:
 *                   type: string
 *                   example: 123123123
 *     responses:
 *       200:
 *         description: Return Token
 */
router.post('/auth', auth);

/**
 * @openapi
 * /usuario:
 *   get:
 *     tags: 
 *       - Usuario
 *     parameters:
 *       - in: query 
 *         name: jsonResponse
 *         schema:
 *           type: string
 *         required: true
 *         description: Respose json
 *         example: true
 *       - in: query 
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email de usuario
 *         example: nicolaievbrito@gmail.com
 *     description: Ver usuario por mail
 *     responses:
 *       200:
 *         description: Usuario
 *         content: 
 *           application/json: 
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Usuario'
 */
router.get('/usuario', verifyToken, getUserByEmail);

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags: 
 *       - Usuario
 *     parameters:
 *       - in: query 
 *         name: jsonResponse
 *         schema:
 *           type: string
 *         required: true
 *         description: Respose json
 *         example: true
 *     description: Ver todos los usuarios
 *     responses:
 *       200:
 *         description: Usuarios
 *         content: 
 *           application/json: 
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Usuario'
 */
 router.get('/usuarios', verifyToken, isAuthenticated, renderizarUsuarios);

router.get('/formUsuario', isAuthenticated, renderizarFormUsuario);

/**
 * @openapi
 * /nuevoUsuario:
 *   post:
 *     tags: 
 *       - Usuario
 *     parameters:
 *       - in: query 
 *         name: jsonResponse
 *         schema:
 *           type: string
 *         required: true
 *         description: Respose json
 *         example: true
 *     description: Nuevo usuario
 *     requestBody:
 *        required: true
 *        content: 
 *          application/json: 
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Nuevo Usuario
 *         content: 
 *           application/json: 
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Usuario'
 */
router.post('/nuevoUsuario', verifyToken, crearUsuario);

router.get('/editarUsuario', isAuthenticated, renderizadoActualizarFormUsuario);

/**
 * @openapi
 * /actualizarUsuario/{id}:
 *   put:
 *     tags: 
 *       - Usuario
 *     parameters:
 *       - in: query 
 *         name: jsonResponse
 *         schema:
 *           type: string
 *         required: true
 *         description: Respose json
 *         example: true
 *       - in: path 
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id de usuario
 *         example: 63790ab0a9372511b7eb6146
 *     description: Editar usuario
 *     responses:
 *       200:
 *         description: Usuario
 *         content: 
 *           application/json: 
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Usuario'
 */
router.put('/actualizarUsuario/:id', verifyToken, actualizarUsuario);

/**
 * @openapi
 * /eliminarUsuario/{id}:
 *   delete:
 *     tags: 
 *       - Usuario
 *     parameters:
 *       - in: query 
 *         name: jsonResponse
 *         schema:
 *           type: string
 *         required: true
 *         description: Respose json
 *         example: true
 *       - in: path 
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id de usuario
 *         example: 63790ab0a9372511b7eb6146
 *     description: Eliminar usuario
 *     responses:
 *       200:
 *         description: Usuario
 *         content: 
 *           application/json: 
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 63790ab0a9372511b7eb6146
 */
router.delete('/eliminarUsuario/:id', verifyToken, eliminarUsuario);

// Registrar usuario
router.get('/formRegistroUsuario', renderRegistrarUsuarioForm);
router.post('/registroUsuario', registrarUsuario);

// Login usuario
router.get('/formLoginUsuario', renderLoginUsuarioForm);
router.post('/loginUsuario', loginUsuario);

// Cerrar sesion usuario
router.get('/cerrarSesion', cerrarSesionUsuario);

module.exports = router;