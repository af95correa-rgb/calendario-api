
// Constructor
const Fechas = function (){
}
              // Métodos para el cálculo de festivos

   // Para obtener la fecha del domingo de pascua (EasterSunday) según un año dado

Fechas.getEasterSunday = function(year){
    A = year % 19;
    B = year % 4;
    C = year % 7;
    D = (19 * A + 24) % 30;
    days = D + ((2*B) + (4*C) + (6*D) + 5) % 7;
    day = 15 + days;
    month = 3;

    if (day > 31){
        day = day - 31;
        month = 4;
    }

    return new Date(year, month -1, day);
}  

function getEasterSunday (year){
    A = year % 19;
    B = year % 4;
    C = year % 7;
    D = (19 * A + 24) % 30;
    days = D + ((2*B) + (4*C) + (6*D) + 5) % 7;
    day = 15 + days;
    month = 3;

    if (day > 31){
        day = day - 31;
        month = 4;
    }

    return new Date(year, month -1, day);
}

   // Para obtener la fecha de inicio de semana santa, Jueves y Viernes Santo (HolyThursday-HolyFriday)
Fechas.getStartHolyweek = function(year){
//function getStartHolyweek(year){
    const EasterDate = getEasterSunday(year);
    const HolyThursday = new Date(EasterDate);
    HolyThursday.setDate(HolyThursday.getDate() + 4);
    const HolyFriday = new Date(EasterDate);
    HolyFriday.setDate(HolyFriday.getDate() + 5);

    return {
        EasterDate,
        HolyThursday,
        HolyFriday
    }
}


// Para agregar un determinado N° de días
Fechas.addDays = function(date, days){
    //obtener fecha del festivo
    const newDate = new Date(date.getTime() + days*24*60*60*1000);
    return newDate;
}

Fechas.aggregateDays = function(date, days){
    //obtener fecha del festivo
    const fecha = new Date(date);
    fecha.setDate(fecha.getDate() + days);
    return fecha;
}


// Para obtener la fecha del siguiente Lunes: "Ley del festivo"
Fechas.getNextMonday = function(date){
    // Obtener el día de la fecha dada
    const Weekday = date.getDay();
    // Calcular los días restantes para el siguiente Lunes
    const remainingDays = 1 + (7 - Weekday) % 7;
    // Obtener el festivo
    //const holidayMonday = addDays(date, residualDays);
    const holidayMonday = new Date(date);
    holidayMonday.setDate(date.getDate() + remainingDays);

    return holidayMonday;

}

// Para validar si es una fecha valida
Fechas.checkdate = function(date) {
    try {
        const {year, month, day} = date.params;

        const fecha = new Date(year, month -1, day);
        
        if (isNaN(fecha)  || (fecha.getMonth() + 1 !== parseInt(month)) || (fecha.getDate() !== parseInt(day)))
        {
          return  res.status(400).json({ error: 'Ingrese una fecha valida'});
        }
    } catch (error){
        console.log(error, 'unable to check date');
    }
}

module.exports = Fechas;
