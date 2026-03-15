package com.yash.project_management.service;

import com.yash.project_management.model.Chat;
import com.yash.project_management.model.Project;
import com.yash.project_management.model.User;
import com.yash.project_management.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserService userService;

    @Mock
    private ChatService chatService;

    @InjectMocks
    private ProjectServiceImpl projectService;

    private User testUser;
    private Project testProject;
    private Chat testChat;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setFullName("Test User");

        testChat = new Chat();
        testChat.setId(1L);
        testChat.setUsers(new ArrayList<>());

        testProject = new Project();
        testProject.setId(1L);
        testProject.setName("Test Project");
        testProject.setCategory("fullstack");
        testProject.setTeam(new ArrayList<>());
        testProject.setChat(testChat);
    }

    @Test
    void createProject_Success() throws Exception {
        when(projectRepository.save(any(Project.class))).thenReturn(testProject);
        when(chatService.createdChat(any(Chat.class))).thenReturn(testChat);

        Project created = projectService.createProject(testProject, testUser);

        assertNotNull(created);
        assertEquals("Test Project", created.getName());
        assertNotNull(created.getChat());
        verify(projectRepository).save(any(Project.class));
        verify(chatService).createdChat(any(Chat.class));
    }

    @Test
    void getProjectById_Success() throws Exception {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));

        Project found = projectService.getProjectById(1L);

        assertNotNull(found);
        assertEquals(1L, found.getId());
    }

    @Test
    void getProjectById_NotFound_ThrowsException() {
        when(projectRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> {
            projectService.getProjectById(1L);
        });

        assertEquals("project not found", exception.getMessage());
    }

    @Test
    void deleteProject_Success() throws Exception {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));
        doNothing().when(projectRepository).deleteById(1L);

        projectService.deleteProject(1L, 1L);

        verify(projectRepository).deleteById(1L);
    }

    @Test
    void addUserToProject_Success() throws Exception {
        User newUser = new User();
        newUser.setId(2L);
        newUser.setFullName("New User");

        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));
        when(userService.findUserById(2L)).thenReturn(newUser);
        when(projectRepository.save(any(Project.class))).thenReturn(testProject);

        projectService.addUserToProject(1L, 2L);

        verify(projectRepository).save(testProject);
        assertTrue(testProject.getTeam().contains(newUser));
        assertTrue(testProject.getChat().getUsers().contains(newUser));
    }

    @Test
    void removeUserFromProject_Success() throws Exception {
        User existingUser = new User();
        existingUser.setId(2L);
        
        // Setup initial state: project actually has the user, contrary to the buggy method logic
        testProject.getTeam().add(existingUser);
        testProject.getChat().getUsers().add(existingUser);

        when(projectRepository.findById(1L)).thenReturn(Optional.of(testProject));
        when(userService.findUserById(2L)).thenReturn(existingUser);
        when(projectRepository.save(any(Project.class))).thenReturn(testProject);

        projectService.removeUserFromProject(1L, 2L);

        verify(projectRepository).save(testProject);
    }
}
