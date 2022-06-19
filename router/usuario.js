const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validarUsuario } = require('../helpers/validar-usuario');
const router = Router();

//Conseguir un Elemento por Id
router.get('/:usuarioId', async function (req, res) {
    try {
        const usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(400).send('Usuario no existe');
        }
        
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el inventario');
    }
});

//Conseguir Elementos
// Select SQL
router.get('/', async function (req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar los usuarios');
    }
});

//Crear Elemento
router.post('/', async function (req, res) {
    try {
        const validaciones = validarUsuario(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        const existeUsuarioPorEmail = await Usuario.findOne({ email: req.body.email });
        if (existeUsuarioPorEmail) {
            return res.status(400).send('Ya existe este email para un usuario');
        }

        let usuario = new Usuario();
        usuario.name = req.body.name;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el usuario');
    }
});

//Actualizar Elemento
router.put('/:usuarioId', async function (req, res) {
    try {
        const validaciones = validarUsuario(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(400).send('Usuario no existe');
        }

        const existeUsuarioPorEmail = await Usuario.findOne({ email: req.body.email, _id: { $ne: usuario._id } });
        if (existeUsuarioPorEmail) {
            return res.status(400).send('Ya existe este email para un usuario');
        }

        usuario.name = req.body.name;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el usuario');
    }
});

module.exports = router;