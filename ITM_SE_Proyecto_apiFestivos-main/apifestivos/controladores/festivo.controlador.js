const festivo = require('../repositorios/festivo.modelo');
const fechas = require('../servicios/fechas');
const bd = require('../repositorios/bd');

//metodo para obtener la lista de los tipos de festivos
exports.listar = (req, res) => {
    festivo.listar((err, datos) => {
        if (err) {
            return res.status(500).send(
                { mensaje: 'Error obteniendo la lista de festivos' });
        }
        else {
            //devolver los registros obtenidos
            return res.send(datos);
        }
    });
}

// metodo para obtener los días en que cae Semana Santa
exports.obtenerSemanaSanta = async function (req, res) {
    try {
        const { year } = req.params;

        if (isNaN(year) || parseInt(year) <= 1000 || parseInt(year) > 9999) {
            return res.status(400).json({ error: 'Ingrese un año válido' });
          }
        const semanaSanta = fechas.getStartHolyweek(parseInt(year));

        const response = {
            Message: semanaSanta.EasterDate.toISOString().slice(0, 10)
        };

        res.json(response);
    } catch(error){
        console.error('Error al obtener el inicio de Semana Santa:', error);
    }
}

// Método para obtener la lista de festivos de cualquier año
exports.obtener = async function (req, res) {
    try {
        const { year } = req.params;
        if (isNaN(year) || parseInt(year) <= 1000 || parseInt(year) > 9999) {
            return res.status(400).json({ error: 'Ingrese un año válido' });
          }

        const basedatos = bd.obtenerBaseDatos();

        const tiposFestivos = await basedatos.collection('tipos').find({})
          .toArray();
        
        let listafestivos = [];
        //for (const tipo of tiposFestivos) {
        tiposFestivos.forEach(tipo => {
            switch (tipo.id) {
                case 1: 
                   tipo.festivos.forEach(festivo => {
                     const fechafestivo = new Date(year, festivo.mes -1, festivo.dia);
                        listafestivos.push({
                            nombre: festivo.nombre,
                            fecha: fechafestivo.toISOString().split('T')[0],
                    });
                 }); break; 
                case 2:
                    for (const festivo of tipo.festivos) {
                    const fechafestivo = new Date(year, festivo.mes -1, festivo.dia);
                    
                    if (fechafestivo.getDay() !== 1 ) {
                        const remainingDays = (8 - fechafestivo.getDay());
                        fechafestivo.setDate(fechafestivo.getDate() + remainingDays);
                    } 
                        listafestivos.push({
                            nombre: festivo.nombre,
                            fecha: fechafestivo.toISOString().split('T')[0],
                        });
                    } break;
                case 3: 
                    for (const festivo of tipo.festivos) {
                        const EasterDate = fechas.getEasterSunday(parseInt(year));
                        const festivofecha = fechas.aggregateDays(EasterDate, festivo.diasPascua + 7);
                        listafestivos.push({
                            nombre: festivo.nombre,
                            fecha: festivofecha.toISOString().split('T')[0],
                        }); 
                    } break;
                case 4:
                    for (const festivo of tipo.festivos) {
                        const EarsteDate = fechas.getEasterSunday(parseInt(year));
                        const festivofecha = fechas.aggregateDays(EarsteDate, festivo.diasPascua + 7);
                        const newdate = fechas.getNextMonday(festivofecha);
                        //const formatedDate = `${newdate.getFullYear()}-${(newdate.getMonth() + 1).toString().padStart(2, '0')}-${newdate.getDate().toString().padStart(2, '0')}`;
                        listafestivos.push({
                            nombre: festivo.nombre,
                            fecha: newdate.toISOString().split('T')[0]
                        });
                    } break;      
            } 
        }); 
        festivosordenados = listafestivos.sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha));

        const response =  festivosordenados;
        res.json(response);

    } catch (error) {
        console.error('Error al listar los festivos:', error);
    }    
}

// Método para verificar si una fecha dada si es festiva.
exports.verificar = async function (req, res) {
    try {
        const { year, month, day } = req.params;
 
        const fecha = new Date(year, month - 1, day);
        //if (fechas.checkdate(req));

        if (isNaN(fecha) || fecha.getMonth() + 1 !== parseInt(month) || fecha.getDate() !== parseInt(day)) {
           return res.status(400).json({ error: 'Ingrese una fecha válida' });
        } 
            const basedatos = bd.obtenerBaseDatos();
            const tiposFestivos = await basedatos.collection('tipos').find({}).toArray();

            var tipofestivo = null;
            var shiftDate = null;

            tiposFestivos.forEach(tipo => {
                switch (tipo.id) {
                    case 1:
                        tipo.festivos.forEach(festivo => {
                            const fechafestivo = new Date(year, festivo.mes -1, festivo.dia);
                            if (fechafestivo.getTime() === fecha.getTime()){
                                tipofestivo = festivo.nombre;
                            }  
                        }); break; 
                    case 2: 
                        tipo.festivos.forEach(festivo => {
                           const fechafestivo = new Date(year, festivo.mes -1, festivo.dia); 
                           const weekday = fechafestivo.getDay();  ;
                           if (weekday !== 1) {
                               shiftDate = fechas.getNextMonday(fechafestivo);
                               if (shiftDate.getTime() === fecha.getTime()){
                                    tipofestivo = festivo.nombre;
                               }
                           } else if (weekday === 1){
                                if (fechafestivo.getTime() === fecha.getTime()) {
                                    tipofestivo = festivo.nombre;                   
                                }
                            }
                        }); break;
                    case 3:
                        for (const festivo of tipo.festivos) {
                            const EasterDate = fechas.getEasterSunday(parseInt(year));
                            const festivofecha = fechas.aggregateDays(EasterDate, festivo.diasPascua + 7);
                            
                            if (festivofecha.getTime() === fecha.getTime()) {
                                tipofestivo = festivo.nombre;                   
                            }
                    }; break;
                    case 4:
                        for (const festivo of tipo.festivos) {
                            const EasterDate = fechas.getEasterSunday(parseInt(year));
                            const festivofecha = fechas.aggregateDays(EasterDate, festivo.diasPascua + 7);
                            const NewshiftDate = fechas.getNextMonday(festivofecha);
                            
                            if (NewshiftDate.getTime() === fecha.getTime()) {
                                tipofestivo = festivo.nombre;                   
                            }
                        } break; 
                    }
                });

            if (tipofestivo) {
                message = `Es Festivo: ${tipofestivo}`;
            } else {
                message = `No es Festivo: ${tipofestivo}`;
            }

            const response =  {
                Mensaje: message
            };

            res.json(response);
        } catch (error) {
            console.error('Error al verificar si es festivo:', error);
    }
} 
