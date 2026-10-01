//module.exports = (app) => {

const express = require('express');
const controlFestivo = require('../controladores/festivo.controlador');
const router = express.Router();
const { check } = require('express-validator');

/**
 * @swagger
 * /api/festivos/tiposfestivos:
 *   get:
 *     summary: Lista los tipos de festivos.
 *     tags: [Festivos]
 *     responses:
 *       200:
 *         description: Lista de tipos de festivos.
 */
router.get('/api/festivos/tiposfestivos', controlFestivo.listar);

/**
 * @swagger
 * /api/festivos/obtener/{year}:
 *   get:
 *     summary: Obtiene los festivos de un año específico.
 *     tags: [Festivos]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año para consultar los festivos.
 *     responses:
 *       200:
 *         description: Lista de festivos del año indicado.
 */
router.get('/api/festivos/obtener/:year', controlFestivo.obtener);

/**
 * @swagger
 * /api/festivos/obtenerSemanaSanta/{year}:
 *   get:
 *     summary: Obtiene las fechas de Semana Santa para un año específico.
 *     tags: [Festivos]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año para calcular Semana Santa.
 *     responses:
 *       200:
 *         description: Fechas de Semana Santa del año indicado.
 */
router.get('/api/festivos/obtenerSemanaSanta/:year', controlFestivo.obtenerSemanaSanta);

/**
 * @swagger
 * /api/festivos/verificar/{year}/{month}/{day}:
 *   get:
 *     summary: Verifica si una fecha específica es festiva.
 *     tags: [Festivos]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año de la fecha a verificar.
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mes de la fecha a verificar.
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: integer
 *         description: Día de la fecha a verificar.
 *     responses:
 *       200:
 *         description: Resultado de la verificación de festivo.
 */
router.get('/api/festivos/verificar/:year/:month/:day', [
    check('year').isInt(),
    check('month').isInt(),
    check('day').isInt(),
], controlFestivo.verificar);

module.exports = router;


