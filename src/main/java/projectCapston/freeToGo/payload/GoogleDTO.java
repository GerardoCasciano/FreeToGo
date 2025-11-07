package projectCapston.freeToGo.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GoogleDTO {
    private String userPrompt;
    private String generatedResponse;

    private List<Source> sources;

    // Classe interna per un singolo risultato

    public static class Source {
        private final String title;
        private final String url;

        public Source(String title, String url) {
            this.title = title;
            this.url = url;
        }

        @Override
        public String toString() {
            return "Source{'''" +
                    "title='''" + title + "''''''" +
                    ", url='''" + url + "''''''" +
                    '}';
        }
    }

    public GoogleDTO() {
    }

    //  costruttore per accettare List<Source>
    public GoogleDTO(String userPrompt, String generatedResponse, List<Source> sources) {
        this.userPrompt = userPrompt;
        this.generatedResponse = generatedResponse;
        this.sources = sources;
    }

    @Override
    public String toString() {
        return "GoogleDTO{'''" +
                "userPrompt='''" + userPrompt + "''''''" +
                ", generatedResponse='''" + generatedResponse + "''''''" +
                ", sources=" + sources +
                '}';
    }
}