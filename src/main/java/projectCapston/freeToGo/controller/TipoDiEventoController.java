package projectCapston.freeToGo.controller;

import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import projectCapston.freeToGo.entities.TipoDiEvento;
import projectCapston.freeToGo.payload.TipoDiEventoDTO;
import projectCapston.freeToGo.service.TipoDIEventoService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tipievento")
public class TipoDiEventoController {
    @Autowired
    private TipoDIEventoService tipoDIEventoService;
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<TipoDiEvento> findAll(){
        return tipoDIEventoService.getAllTipiEvento();
    }
    @GetMapping("/categoria/{categoriaId}")
    @ResponseStatus(HttpStatus.OK)
    public List<TipoDiEvento> findByCategoriaId(@PathVariable UUID categoriaId){
        return tipoDIEventoService.findByCategoriaId(categoriaId);
    }
    //CREAZIONE
 @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TipoDiEvento create(@RequestBody @Valid TipoDiEventoDTO dto){
        return tipoDIEventoService.createTipoEvento(dto);
 }
 //AGGIORNAMENTO
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TipoDiEvento update(@PathVariable UUID id, @RequestBody @Valid TipoDiEventoDTO dto){
        return tipoDIEventoService.updateTipoEvento(id, dto);
    }
     //DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id){
        tipoDIEventoService.deleteTipoEvento(id);
    }
}
