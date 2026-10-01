//Cargar la libreria para operar con bases de datos mongo
//const mongo = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
//Cargar la configuración de la BD
const configBD = require('../configuracion/bd.config');

//Asignar cadena de conexión
const url = `mongodb://${configBD.SERVIDOR}:${configBD.PUERTO}`;
// `mongodb://localhost:27017`
const client = new MongoClient(url);
//objeto que contiene la conexion a la bd
let basedatos;

module.exports = {

    conectar: async function(){
        try{
            await client.connect();
            console.log("Se ha establecido conexion a la BD")
            basedatos = client.db(configBD.BASEDATOS)
        } catch (error){
            console.log(error)
        }
    }, obtenerBaseDatos: function(){
        return basedatos;
        }
}