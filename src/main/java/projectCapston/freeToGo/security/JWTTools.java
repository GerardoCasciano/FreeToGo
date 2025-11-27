package projectCapston.freeToGo.security;



import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import projectCapston.freeToGo.entities.Utente;
import projectCapston.freeToGo.exceptions.UnauthorizedException;

import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;


 @Component
public class JWTTools {

    @Value("${jwt.secret}")
    private String secret;

    public String createToken (Utente utente){
        if (secret == null || secret.isEmpty()) {
            throw new RuntimeException("JWT secret non è configurato.");
        }
        String ruoliString = utente.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .subject(String.valueOf(utente.getId()))
                .claim("roles", ruoliString)
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();

    }
    public void verifyToken(String accessToken){
        try{
            Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build().parseSignedClaims(accessToken);
        } catch (SignatureException e) {
            throw new UnauthorizedException("Token non valido o scaduto!");
        } catch (MalformedJwtException e) {
            throw new UnauthorizedException("Token malformato!");
        } catch (ExpiredJwtException e) {
            throw new UnauthorizedException("Token scaduto!");
        } catch (UnsupportedJwtException e) {
            throw new UnauthorizedException("Token non supportato!");
        } catch (IllegalArgumentException e) {
            throw new UnauthorizedException("Token vuoto o non valido!");
        }
    }
    public UUID extractIdFromToken(String accessToken){
        return UUID.fromString(Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build()
                .parseSignedClaims(accessToken)
                .getPayload()
                .getSubject()
        );
    }
    public Claims extractAllClaims(String accessToken){
        try{
            return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build()
                    .parseSignedClaims(accessToken)
                    .getPayload();
        }catch (Exception exception){
            throw new UnauthorizedException("Problema con l'estrazione di claims dal token" + exception.getMessage());
        }
    }
}


