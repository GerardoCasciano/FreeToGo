package projectCapston.freeToGo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import projectCapston.freeToGo.payload.CategoriaRequestDTO;
import projectCapston.freeToGo.payload.CategoriaResponseDTO;
import projectCapston.freeToGo.service.CategoriaService;

import java.util.UUID;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoriaResponseDTO create (@RequestBody @Valid CategoriaRequestDTO body){
        return categoriaService.create(body);
    }
    @GetMapping("/{id}")
    public CategoriaResponseDTO findById(@PathVariable UUID id){
        return categoriaService.findById(id);
    }
    @PutMapping("/{id}")
    public CategoriaResponseDTO update(@PathVariable UUID id,@RequestBody @Valid CategoriaRequestDTO body){
        return categoriaService.update(id, body);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id){
        categoriaService.delete(id);
    }
}
