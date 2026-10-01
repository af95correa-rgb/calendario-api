package apicalendariolaboral.apicalendariolaboral.aplicacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import apicalendariolaboral.apicalendariolaboral.core.entidades.DTOs.FestivoDto;

@Service
public class FestivoCliente {
    @Autowired
    private RestTemplate restTemplate;
    
    public List<FestivoDto> obtenerFestivos(int año) {
        String url = "http://dockerapifestivos:3030/api/festivos/obtener/" + año;
        ResponseEntity<List<FestivoDto>> responseEntity = restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<FestivoDto>>() {
                });
        return responseEntity.getBody();
    }
}