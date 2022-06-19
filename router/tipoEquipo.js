const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validarTipoEquipo } = require('../helpers/validar-tipoequipo');
const router = Router();

//Conseguir un Elemento por Id
router.get('/:tipoEquipoId', async function (req, res) {
    try {
        const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (!tipoEquipo) {
            return res.status(400).send('Tipo Equipo no existe');
        }
        
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el inventario');
    }
});

//Conseguir Elementos
router.get('/', async function (req, res) {
    try {
        const tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar los estados Equipo');
    }
});

//Crear Elemento
router.post('/', async function (req, res) {
    try {
        const validaciones = validarTipoEquipo(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear estado de Equipo');
    }
});

//Actualizar Elemento
router.put('/:tipoEquipoId', async function (req, res) {
    try {
        const validaciones = validarTipoEquipo(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (!tipoEquipo) {
            return res.status(400).send('Tipo Equipo no existe');
        }

        tipoEquipo.name = req.body.name;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el Tipo Equipo');
    }
});

module.exports = router;