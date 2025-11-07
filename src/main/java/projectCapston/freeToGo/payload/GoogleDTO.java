package projectCapston.freeToGo.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class GoogleDTO {
    private String userPrompt;
    private String generatedResponse;
private List<String> sources;


    public GoogleDTO() {
    }

    public GoogleDTO(String userPrompt, String generatedResponse, List<String> sources) {
        this.userPrompt = userPrompt;
        this.generatedResponse = generatedResponse;
        this.sources = sources;
    }

    @Override
    public String toString() {
        return "GoogleDTO{" +
                "userPrompt='" + userPrompt + '\'' +
                ", generatedResponse='" + generatedResponse + '\'' +
                ", sources=" + sources +
                '}';
    }
}
