package projectCapston.freeToGo.SerApi;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class SerApi {



    public static class OrganicResult {
        @JsonProperty("title")
        public String title;

        @JsonProperty("snippet")
        public String snippet;

        @JsonProperty("link")
        public String link;

        @JsonProperty("source")
        public String source;
    }

    public static class KnowledgeGraph {
        @JsonProperty("title")
        public String title;

        @JsonProperty("snippet")
        public String snippet;

        @JsonProperty("source")
        public Source source;


        public static class Source {
            @JsonProperty("name")
            public String name;

            @JsonProperty("link")
            public String link;
        }
    }

    public static class SearchParameters {
        @JsonProperty("query")
        public String query;

        @JsonProperty("engine")
        public String engine;
    }


    public static class SerApiResponse {

        @JsonProperty("organic_results")
        public List<OrganicResult> organicResults;


        @JsonProperty("knowledge_graph")
        public KnowledgeGraph knowledgeGraph;

        @JsonProperty("search_parameters")
        public SearchParameters searchParameters;
    }
}