package apicalendariolaboral.apicalendariolaboral.presentacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apicalendariolaboral.apicalendariolaboral.core.entidades.Calendario;
import apicalendariolaboral.apicalendariolaboral.core.interfaces.servicios.ICalendarioServicio;

@RestController
@RequestMapping("/api/calendario")
public class CalendarioControlador {
    
@Autowired
    private ICalendarioServicio servicio;

    @RequestMapping(value = "/generar/{año}", method = RequestMethod.GET)
    public boolean generar(@PathVariable int año) {
        return servicio.generar(año);
    }

    @RequestMapping(value = "/listar/{año}", method = RequestMethod.GET)
    public List<Calendario> listar(@PathVariable int año) {
        return servicio.listar(año);
    }

}
