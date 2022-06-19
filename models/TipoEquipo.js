const {Schema, model} = require('mongoose');

const TipoEquipoSchema = Schema ({
    name: {
        type: String,
        required: true,
        unique:true
    }, 
    estado: {
        type: String,
        required: true,
        enum: [
            'Activo', 'Inactivo'
        ]
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    }

});

module.exports = model ('TipoEquipo', TipoEquipoSchema);