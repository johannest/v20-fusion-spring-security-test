package com.example.application;

import com.vaadin.flow.server.connect.Endpoint;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.annotation.security.PermitAll;
import java.util.UUID;

@Endpoint
public class HelloEndpoint {

    @PermitAll
    public String getString() {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && "user".equals(auth.getName())) {
            return UUID.randomUUID().toString();
        }
        return "error";
    }
}
