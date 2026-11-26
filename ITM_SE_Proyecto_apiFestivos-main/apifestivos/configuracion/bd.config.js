module.exports = {
    SERVIDOR: process.env.MONGO_HOST || 'dockerbdfestivos',
    PUERTO: process.env.MONGO_PORT || '27017',
    BASEDATOS: process.env.MONGO_DATABASE || 'festivos',
    USUARIO: '',
    CLAVE: ''
}
