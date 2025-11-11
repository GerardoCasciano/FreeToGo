package projectCapston.freeToGo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectCapston.freeToGo.entities.Categoria;
import projectCapston.freeToGo.exceptions.BadRequestException;
import projectCapston.freeToGo.exceptions.NotFoundException;
import projectCapston.freeToGo.payload.CategoriaRequestDTO;
import projectCapston.freeToGo.payload.CategoriaResponseDTO;
import projectCapston.freeToGo.repositories.CategoriaRepository;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import java.util.stream.Collectors;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;
    private CategoriaResponseDTO convertToDTO(Categoria categoria){
        return new CategoriaResponseDTO(categoria.getId(), categoria.getNome());
    }

    private Categoria converTotEntity(CategoriaRequestDTO dto){
        Categoria categoria= new Categoria();
        categoria.setNome(dto.nome());
        categoria.setDescrizione(dto.descrizione());
        return categoria;
    }


    public CategoriaResponseDTO create(CategoriaRequestDTO dto){
        if(categoriaRepository.existsByNome(dto.nome())){
            throw new BadRequestException("Una categoria con il nome" + dto.nome() + "esiste.");

        }
        Categoria newCategoria = converTotEntity(dto);
        newCategoria = categoriaRepository.save(newCategoria);
        return convertToDTO(newCategoria);
    }
    public List<CategoriaResponseDTO> findAll(){
        return categoriaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CategoriaResponseDTO findById(UUID id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));
        return convertToDTO(categoria);
    }

    public CategoriaResponseDTO update(UUID id ,CategoriaRequestDTO dto){
        Categoria existingCategoria = categoriaRepository.findById(id)
                .orElseThrow(()->new NotFoundException(id));

        if (!existingCategoria.getNome().equals(dto.nome()) && categoriaRepository.existsByNome(dto.nome())){
            throw  new BadRequestException("Il nome" + dto.nome() + "è già in uso da un altra Categoria");
        }
         existingCategoria.setNome(dto.nome());
         existingCategoria.setDescrizione(dto.descrizione());
        existingCategoria= categoriaRepository.save(existingCategoria);

        return convertToDTO(existingCategoria);
    }
    public void delete(UUID id){
        if(!categoriaRepository.existsById(id)){
            throw  new NotFoundException(id);
        }
        categoriaRepository.deleteAllById(Collections.singleton(id));
    }
}
