package projectCapston.freeToGo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Abilita CORS usando il bean CorsConfigurationSource
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        //Login,Registrazione
                        .requestMatchers("/api/auth/**").permitAll()
                        //Lista publica Eventi
                        .requestMatchers("/api/eventi").permitAll()
                        //Tipi di evento
                        .requestMatchers("/api/tipi-evento").permitAll()
                        //Tutte le altre richieste chiedono auth
                        .anyRequest().authenticated()
                )
                //Configura la gestione delle sessioni
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Ho corretto l'errore di sintassi nella lista di origin
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3008", "http://127.0.0.1:3008", "http://localhost:5432", "http://127.0.0.1:5173", "http://localhost", "https://*"));
        
        // Permette tutti i metodi e header come nell'originale
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Applica la configurazione a tutti i percorsi
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
