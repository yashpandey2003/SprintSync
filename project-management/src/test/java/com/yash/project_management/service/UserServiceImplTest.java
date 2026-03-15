package com.yash.project_management.service;

import com.yash.project_management.model.User;
import com.yash.project_management.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setFullName("Test User");
        testUser.setEmail("test@test.com");
        testUser.setProjectSize(1);
    }

    @Test
    void findUserByEmail_Success() throws Exception {
        when(userRepository.findByEmail("test@test.com")).thenReturn(testUser);

        User foundUser = userService.findUserByEmail("test@test.com");

        assertNotNull(foundUser);
        assertEquals("test@test.com", foundUser.getEmail());
    }

    @Test
    void findUserByEmail_NotFound_ThrowsException() {
        when(userRepository.findByEmail("unknown@test.com")).thenReturn(null);

        Exception exception = assertThrows(Exception.class, () -> {
            userService.findUserByEmail("unknown@test.com");
        });

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void findUserById_Success() throws Exception {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        User foundUser = userService.findUserById(1L);

        assertNotNull(foundUser);
        assertEquals(1L, foundUser.getId());
    }

    @Test
    void findUserById_NotFound_ThrowsException() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> {
            userService.findUserById(99L);
        });

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void updateUsersProjectSize_Success() {
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User updatedUser = userService.updateUsersProjectSize(testUser, 1);

        assertEquals(2, updatedUser.getProjectSize());
        verify(userRepository).save(testUser);
    }
}
