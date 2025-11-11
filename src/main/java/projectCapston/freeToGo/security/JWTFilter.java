package projectCapston.freeToGo.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import projectCapston.freeToGo.entities.Utente;
import projectCapston.freeToGo.exceptions.NotFoundException;
import projectCapston.freeToGo.service.UtenteService;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@Component
public class JWTFilter extends OncePerRequestFilter {

    private final JWTTools jwtTools;
    private  final   UtenteService utenteService;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String accessToken = authHeader.substring(7);

        jwtTools.verifyToken(accessToken);

        Claims claims = jwtTools.extractAllClaims(accessToken);
        try {
            String id = claims.getSubject();
            Utente utente = utenteService.findById(
                    UUID.fromString(id));
            String roleString = claims.get("roles", String.class);
            List<SimpleGrantedAuthority> authorities = null;

            if (roleString != null) {
                authorities = Arrays.stream(roleString.split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
            }


            if (authorities != null) {
                authorities.forEach(auth -> System.out.println("Authority: " + auth.getAuthority()));
            }

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(utente, null, authorities);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request, response);
        } catch (NotFoundException exception) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Utente non trovato");
        }
    }
}
