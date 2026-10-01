package apicalendariolaboral.apicalendariolaboral.core.interfaces.servicios;

import java.util.List;

import apicalendariolaboral.apicalendariolaboral.core.entidades.Calendario;

public interface ICalendarioServicio {
    
    public boolean generar(int año);

    public List<Calendario> listar(int año);

    

}
