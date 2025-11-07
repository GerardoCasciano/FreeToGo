package projectCapston.freeToGo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import projectCapston.freeToGo.payload.GoogleDTO;
import projectCapston.freeToGo.service.GoogleService;

@RestController
@RequestMapping("/api/google")
public class GoogleController {
    private final GoogleService googleService;
    @Autowired
    public GoogleController(GoogleService googleService){
        this.googleService=googleService;
    }
    @GetMapping("/search")
    public ResponseEntity<GoogleDTO> searchWeb(@RequestParam("prompt")String prompt){
        GoogleDTO result = googleService.executeSearch(prompt);

        return ResponseEntity.ok(result);
    }

}
