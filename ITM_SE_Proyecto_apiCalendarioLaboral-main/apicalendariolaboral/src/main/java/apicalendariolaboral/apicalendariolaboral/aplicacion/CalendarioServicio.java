package apicalendariolaboral.apicalendariolaboral.aplicacion;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import apicalendariolaboral.apicalendariolaboral.core.entidades.Calendario;
import apicalendariolaboral.apicalendariolaboral.core.entidades.Tipo;
import apicalendariolaboral.apicalendariolaboral.core.entidades.DTOs.FestivoDto;
import apicalendariolaboral.apicalendariolaboral.core.interfaces.repositorios.ICalendarioRepositorio;
import apicalendariolaboral.apicalendariolaboral.core.interfaces.repositorios.ITipoRepositorio;
import apicalendariolaboral.apicalendariolaboral.core.interfaces.servicios.ICalendarioServicio;

@Service
public class CalendarioServicio implements ICalendarioServicio {

    @Autowired
    private final FestivoCliente festivoCliente;

    private List<FestivoDto> festivos;

    @Autowired
    private ITipoRepositorio repositorioTipo;
    @Autowired
    private ICalendarioRepositorio repositorio;

    public CalendarioServicio(FestivoCliente festivoCliente) {
        this.festivoCliente = festivoCliente;
    }

    public static boolean fechasIguales(LocalDate fecha1, Date fecha2) {
        LocalDate localDate2 = fecha2.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return fecha1.equals(localDate2);
    }

    private boolean esFestivo(Date fechaBuscada) {
        Optional<FestivoDto> festivoEncontrado = festivos.stream()
                .filter(festivo -> fechasIguales(festivo.getFecha(), fechaBuscada))
                .findFirst();
        return festivoEncontrado.isPresent();
    }

    private String obtenerDiaSemana(Date fecha) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(fecha);
        int diaSemana = calendar.get(Calendar.DAY_OF_WEEK);
        String[] diasSemana = { "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" };
        return diasSemana[diaSemana - 1];
    }

    private boolean esFinSemana(String nombreDia) {
        List<String> diasFinSemana = new ArrayList<>();
        diasFinSemana.add("Domingo");
        diasFinSemana.add("Sábado");
        return diasFinSemana.contains(nombreDia);
    }

    @Override
    public boolean generar(int año) {
        festivos = festivoCliente.obtenerFestivos(año);

        for (FestivoDto festivo : festivos) {
            System.out.println(festivo.getFecha() + " " + festivo.getNombre());
        }

        Tipo tipo1 = repositorioTipo.findById(1).get();
        Tipo tipo2 = repositorioTipo.findById(2).get();
        Tipo tipo3 = repositorioTipo.findById(3).get();

        List<Calendario> fechas = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, año);
        calendar.set(Calendar.DAY_OF_YEAR, 1); // Establecer el primer día del año

        while (calendar.get(Calendar.YEAR) == año) {
            System.out.println("Fecha a procesar "+calendar.getTime());
            Calendario calendario = new Calendario();
            calendario.setFecha(calendar.getTime());
            if (esFestivo(calendario.getFecha()))
                calendario.setTipo(tipo3);
            else if (esFinSemana(obtenerDiaSemana(calendario.getFecha())))
                calendario.setTipo(tipo2);
            else
                calendario.setTipo(tipo1);

            calendario.setDescripcion(obtenerDiaSemana(calendario.getFecha()));
            fechas.add(calendario);
            calendar.add(Calendar.DAY_OF_YEAR, 1); // Avanzar al siguiente día
        }

        for (Calendario calendario : fechas) {
            System.out.println(
                    calendario.getFecha() + " " + calendario.getTipo().getTipo() + " " + calendario.getDescripcion());

            Calendario encontrado = repositorio.obtener(calendario.getFecha());
            if (encontrado != null) {
                calendario.setId(encontrado.getId());
            } else {
                calendario.setId(0);

            }
            repositorio.save(calendario);
        }
        return true;
    }

    @Override
    public List<Calendario> listar(int año) {
        return repositorio.listarPorAño(año);
    }

}
