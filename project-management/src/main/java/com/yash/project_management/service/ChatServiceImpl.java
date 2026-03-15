package com.yash.project_management.service;

import com.yash.project_management.model.Chat;
import com.yash.project_management.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;

    @Override
    public Chat createdChat(Chat chat) {
        return chatRepository.save(chat);
    }
}
