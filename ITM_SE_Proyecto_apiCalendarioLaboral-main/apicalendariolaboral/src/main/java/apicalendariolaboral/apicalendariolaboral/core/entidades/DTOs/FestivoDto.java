package apicalendariolaboral.apicalendariolaboral.core.entidades.DTOs;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class FestivoDto {

    private String nombre;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate fecha;

    public FestivoDto() {
    }

    public FestivoDto(String nombre, LocalDate fecha) {
        this.nombre = nombre;
        this.fecha = fecha;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

}

