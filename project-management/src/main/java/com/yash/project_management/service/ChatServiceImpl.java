package com.yash.project_management.service;

import com.yash.project_management.model.Chat;
import com.yash.project_management.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService{
    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Chat createdChat(Chat chat) {
        return chatRepository.save(chat);
    }
}
