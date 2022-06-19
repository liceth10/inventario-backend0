const validarTipoEquipo = (req) => {
    const validaciones = [];

    if (!req.body.name) {
        validaciones.push('Nombre es requerido');
    }

    if (!req.body.estado) {
        validaciones.push('Modelo es requerido');
    }
    return validaciones;

}

module.exports = {
    validarTipoEquipo
}