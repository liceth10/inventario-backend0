const { Router } = require('express');
const Marca = require('../models/Marca');
const { validarMarca } = require('../helpers/validar-marca');
const router = Router();

//Conseguir un Elemento por Id
router.get('/:marcaId', async function (req, res) {
    try {
        const marca = await Marca.findById(req.params.marcaId);
        if (!marca) {
            return res.status(400).send('Marca no existe');
        }
        
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el inventario');
    }
});

//Conseguir Elementos
router.get('/', async function (req, res) {
    try {
        const marcas = await Marca.find();
        res.send(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar marca');
    }
});

//Crear Elemento
router.post('/', async function (req, res) {
    try {
        const validaciones = validarMarca(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let marca = new Marca();
        marca.name = req.body.name;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear marca');
    }
});

//Actualizar Elemento
router.put('/:marcaId', async function (req, res) {
    try {
        const validaciones = validarMarca(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let marca = await Marca.findById(req.params.marcaId);
        if (!marca) {
            return res.status(400).send('Marca no existe');
        }

        marca.name = req.body.name;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar la Marca');
    }
});

module.exports = router;