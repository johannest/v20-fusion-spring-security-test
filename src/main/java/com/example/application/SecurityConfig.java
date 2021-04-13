package com.example.application;

import com.vaadin.flow.spring.security.VaadinWebSecurityConfigurerAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurityConfigurerAdapter {

    private static final String LOGIN_PROCESSING_URL = "/login";
    private static final String LOGIN_FAILURE_URL = "/login?error";
    private static final String LOGIN_URL = "/login";
    private static final String LOGOUT_SUCCESS_URL = "/";

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/about").permitAll();

        super.configure(http);

        // use a form based login
        http.formLogin();

//        http.formLogin().loginPage(LOGIN_URL).permitAll()
//                .loginProcessingUrl(LOGIN_PROCESSING_URL)
//                .failureUrl(LOGIN_FAILURE_URL)
//                .successHandler(new SavedRequestAwareAuthenticationSuccessHandler());
//        http.logout().logoutSuccessUrl(LOGOUT_SUCCESS_URL);
    }


    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
        web.ignoring().antMatchers(
                "/images/**",
                "/icons/**",
                "/VAADIN/**",
                "/manifest.webmanifest",
                "/sw.js",
                "/offline-page.html",
                "/frontend/**"
        );
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Configure users and roles in memory
        auth.inMemoryAuthentication()
                .withUser("user").password(passwordEncoder.encode("123")).roles("USER")
                .and()
                .withUser("admin").password(passwordEncoder.encode("123")).roles("ADMIN", "USER")
        ;
    }
}