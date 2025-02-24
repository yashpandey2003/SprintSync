package com.yash.project_management.service;

public interface EmailService {

    void sendEmailWithToken(String userEmail, String link) throws Exception;
}
