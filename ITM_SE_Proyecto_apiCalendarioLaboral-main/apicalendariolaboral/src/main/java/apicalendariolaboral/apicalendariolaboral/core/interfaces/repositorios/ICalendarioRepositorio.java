package apicalendariolaboral.apicalendariolaboral.core.interfaces.repositorios;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import apicalendariolaboral.apicalendariolaboral.core.entidades.Calendario;

public interface ICalendarioRepositorio extends JpaRepository<Calendario, Long> {
    
    @Query("SELECT c FROM Calendario c  WHERE year(c.fecha) = ?1")
    public List<Calendario> listarPorAño(int año);

    @Query("SELECT c FROM Calendario c WHERE c.fecha = :fecha")
    public Calendario obtener(@Param("fecha")Date fecha);

}
