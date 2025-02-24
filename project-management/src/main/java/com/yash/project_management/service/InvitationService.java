package com.yash.project_management.service;

import com.yash.project_management.model.Invitation;

public interface InvitationService {
    public void sendInvitation(String email, Long projectId) throws Exception;
    public Invitation acceptInvitation(String token, Long userId) throws Exception;
    public String getTokenByUserMail(String userEmail);
    void deleteToken(String token);

}
