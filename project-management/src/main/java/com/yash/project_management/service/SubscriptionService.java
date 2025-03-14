package com.yash.project_management.service;

import com.yash.project_management.model.PlanType;
import com.yash.project_management.model.Subscription;
import com.yash.project_management.model.User;

public interface SubscriptionService {
    Subscription createSubscription(User user);
    Subscription getUserSubscription(Long userId) throws Exception;
    Subscription upgradeSubscription(Long userId, PlanType planType);
    boolean isValid(Subscription subscription);
}