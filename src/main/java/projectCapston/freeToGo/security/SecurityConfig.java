package projectCapston.freeToGo.security;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import java.util.Collections;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
private final UserDetailsService userDetailsService;
private final JwtAuthEntryPoint jwtAuthEntriPoint;

//Iniezione delle dipendenze per la configurazone
    public SecurityConfig(UserDetailsService userDetailsService,JwtAuthEntryPoint jwtAuthEntriPoint){
        this.userDetailsService=userDetailsService;
        this.jwtAuthEntriPoint=jwtAuthEntriPoint;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
//Configurazione SecurityFilterChain

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JWTFilter jwtFilter) throws Exception {
        http
                .cors(cors->cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                //Gestione eccezioni jwt
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(jwtAuthEntriPoint))
                //conf sessione Statless (senza stato)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/utenti").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/eventi/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/utenti/**").hasRole("ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated());


                        //Filtro jwt
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
               return http.build();
    }
 //Configurazione CORS per far accedere il frontend React al backend
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration() ;

            configuration.setAllowedOrigins(Collections.singletonList("*"));//permette tutte le origini
            configuration.setAllowedMethods((Arrays.asList("GET","POST","PUT","PATCH","DELETE")));//Tutti i metodi
            configuration.setAllowedHeaders(Collections.singletonList("*"));//tutti gli headers

        //Registrazine della sorgente
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //Associa la configurazine a tutti i peercorsi
        source.registerCorsConfiguration("/**",configuration);

        return source ;
        };

    }


