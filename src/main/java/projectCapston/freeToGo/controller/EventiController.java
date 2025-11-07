package projectCapston.freeToGo.controller;

import jdk.jfr.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectCapston.freeToGo.entities.Eventi;
import projectCapston.freeToGo.service.EventiService;
import projectCapston.freeToGo.service.UtenteService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3005")
public class EventiController {
    @Autowired
    private EventiService eventiService;
    @Autowired
    private UtenteService utenteService;

    @GetMapping
    public ResponseEntity<List<Eventi>>getEventi(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date,
            @RequestParam(required = false) String regione,
            @RequestParam(required = false) String categoria
            ){
         List<Eventi> eventi = eventiService.findEvents(date,regione,categoria);
     return ResponseEntity.ok(eventi);
    }

}
