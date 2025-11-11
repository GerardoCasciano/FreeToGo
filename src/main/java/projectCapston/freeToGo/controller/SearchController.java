package projectCapston.freeToGo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectCapston.freeToGo.entities.Eventi;
import projectCapston.freeToGo.service.InternalSearchService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:3005")
public class SearchController {

    @Autowired
    private InternalSearchService internalSearchService;

    @GetMapping
    public ResponseEntity<List<Eventi>> searchEvents(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String luogo,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) Double maxPrezzo) {
        List<Eventi> eventi = internalSearchService.findEvents(date, luogo, categoria, maxPrezzo);
        return ResponseEntity.ok(eventi);
    }
}
