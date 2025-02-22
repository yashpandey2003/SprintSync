package com.yash.project_management.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtConstant {

    @Value("${SECRET_KEY}")
    public static String SECRET_KEY;

    public static final String JWT_HEADER = "Authorization";

    @Value("${SECRET_KEY}")
    public void setSecretKey(String secretKey) {
        SECRET_KEY = secretKey;
    }
}
