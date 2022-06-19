const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validarInventario } = require('../helpers/validar-invetario');
const router = Router();

//Conseguir un Elemento por Id
router.get('/:inventarioId', async function (req, res) {
    try {
        const inventario = await Inventario.findById(req.params.inventarioId).populate([
            {
                path: 'usuario', select: 'name email estado'
            },
            {
                path: 'marca', select: 'name estado'
            },
            {
                path: 'tipoEquipo', select: 'name estado'
            },
            {
                path: 'estadoEquipo', select: 'name estado'
            }
        ]);
        if (!inventario) {
            return res.status(400).send('Inventario no existe');
        }
        
        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el inventario');
    }
});

//Conseguir Elementos
router.get('/', async function (req, res) {
    try {
        const inventarios = await Inventario.find().populate([
            {
                path: 'usuario', select: 'name email estado'
            },
            {
                path: 'marca', select: 'name estado'
            },
            {
                path: 'tipoEquipo', select: 'name estado'
            },
            {
                path: 'estadoEquipo', select: 'name estado'
            }
        ]);
        res.send(inventarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar inventarios');
    }
});

//Crear Elemento
router.post('/', async function (req, res) {
    try {
        const validaciones = validarInventario(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
        if (existeInventarioPorSerial) {
            return res.status(400).send('Ya existe este serial para otro equipo');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id.name;
        inventario.marca = req.body.marca._id.name;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();
        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Crear el inventario');
    }
});

//Actualizar Elemento
router.put('/:inventarioId', async function (req, res) {
    try {
        const validaciones = validarInventario(req);
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let inventario = await Inventario.findById(req.params.inventarioId);
        if (!inventario) {
            return res.status(400).send('Inventario no existe');
        }

        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial, _id: { $ne: inventario._id } });
        if (existeInventarioPorSerial) {
            return res.status(400).send('Ya existe este serial para otro equipo');
        }

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id.name;
        inventario.marca = req.body.marca._id.name;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();
        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el inventario');
    }
});

module.exports = router;