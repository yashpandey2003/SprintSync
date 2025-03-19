package com.yash.project_management.RateLimiterConfig;

import com.yash.project_management.Exception.RateLimitExceededException;
import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RateLimiterRegistry;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class GlobalRateLimiterAspect {

    private final RateLimiter rateLimiter;

    public GlobalRateLimiterAspect(RateLimiterRegistry rateLimiterRegistry) {
        this.rateLimiter = rateLimiterRegistry.rateLimiter("globalRateLimiter");
    }

    @Before("within(@org.springframework.web.bind.annotation.RestController *)")
    public void applyGlobalRateLimiter() {
        if (!rateLimiter.acquirePermission(1)) {
            throw new RateLimitExceededException("Too many requests, please try again later.");
        }
    }
}
