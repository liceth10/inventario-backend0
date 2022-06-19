const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const { validarEstadoEquipo } = require('../helpers/validar-estadoequipo');
const router = Router();

//Conseguir un Elemento por Id
router.get('/:estadoEquipoId', async function (req, res) {
    try {
        const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if (!estadoEquipo) {
            return res.status(400).send('Estado Equipo no existe');
        }
        
        res.send(estadoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el inventario');
    }
});

//Conseguir Elementos
router.get('/', async function (req, res) {
    try {
        const estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar los estados de equipos');
    }
});

//Crear Elemento
router.post('/', async function (req, res) {
    try {
        const validaciones = validarEstadoEquipo(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.name = req.body.name;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el estado equipo');
    }
});

//Actualizar Elemento
router.put('/:estadoEquipoId', async function (req, res) {
    try {
        const validaciones = validarEstadoEquipo(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if (!estadoEquipo) {
            return res.status(400).send('Estado Equipo no existe');
        }

        estadoEquipo.name = req.body.name;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el Estado Equipo');
    }
});

module.exports = router;