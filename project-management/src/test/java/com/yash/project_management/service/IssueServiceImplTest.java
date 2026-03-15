package com.yash.project_management.service;

import com.yash.project_management.model.Issue;
import com.yash.project_management.model.Project;
import com.yash.project_management.model.User;
import com.yash.project_management.repository.IssueRepository;
import com.yash.project_management.request.IssueRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IssueServiceImplTest {

    @Mock
    private IssueRepository issueRepository;

    @Mock
    private ProjectService projectService;

    @Mock
    private UserService userService;

    @InjectMocks
    private IssueServiceImpl issueService;

    private Issue testIssue;
    private Project testProject;
    private User testUser;
    private IssueRequest testRequest;

    @BeforeEach
    void setUp() {
        testProject = new Project();
        testProject.setId(1L);
        testProject.setName("Test Project");

        testUser = new User();
        testUser.setId(1L);
        testUser.setFullName("Test User");

        testIssue = new Issue();
        testIssue.setId(1L);
        testIssue.setTitle("Test Issue");
        testIssue.setStatus("pending");
        testIssue.setProjectID(1L);
        testIssue.setProject(testProject);

        testRequest = new IssueRequest();
        testRequest.setTitle("Test Issue");
        testRequest.setDescription("Description");
        testRequest.setStatus("pending");
        testRequest.setProjectID(1L);
        testRequest.setPriority("high");
        testRequest.setDueDate(LocalDate.now());
    }

    @Test
    void getIssueById_Success() throws Exception {
        when(issueRepository.findById(1L)).thenReturn(Optional.of(testIssue));

        Issue found = issueService.getIssueById(1L);

        assertNotNull(found);
        assertEquals("Test Issue", found.getTitle());
    }

    @Test
    void getIssueById_NotFound_ThrowsException() {
        when(issueRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> {
            issueService.getIssueById(1L);
        });

        assertEquals("No issues found with issueid 1", exception.getMessage());
    }

    @Test
    void getIssueByProjectId_Success() throws Exception {
        when(issueRepository.findByProjectId(1L)).thenReturn(Arrays.asList(testIssue));

        List<Issue> issues = issueService.getIssueByProjectId(1L);

        assertFalse(issues.isEmpty());
        assertEquals(1, issues.size());
    }

    @Test
    void createIssue_Success() throws Exception {
        when(projectService.getProjectById(1L)).thenReturn(testProject);
        when(issueRepository.save(any(Issue.class))).thenReturn(testIssue);

        Issue created = issueService.createIssue(testRequest, testUser);

        assertNotNull(created);
        assertEquals("Test Issue", created.getTitle());
        verify(issueRepository).save(any(Issue.class));
    }

    @Test
    void deleteIssue_Success() throws Exception {
        when(issueRepository.findById(1L)).thenReturn(Optional.of(testIssue));
        doNothing().when(issueRepository).deleteById(1L);

        issueService.deleteIssue(1L, 1L);

        verify(issueRepository).deleteById(1L);
    }

    @Test
    void addUserToIssue_Success() throws Exception {
        when(userService.findUserById(1L)).thenReturn(testUser);
        when(issueRepository.findById(1L)).thenReturn(Optional.of(testIssue));
        when(issueRepository.save(any(Issue.class))).thenReturn(testIssue);

        Issue updated = issueService.addUserToIssue(1L, 1L);

        assertNotNull(updated);
        verify(issueRepository).save(any(Issue.class));
    }

    @Test
    void updateStatus_Success() throws Exception {
        when(issueRepository.findById(1L)).thenReturn(Optional.of(testIssue));
        when(issueRepository.save(any(Issue.class))).thenReturn(testIssue);

        Issue updated = issueService.updateStatus(1L, "in_progress");

        assertNotNull(updated);
        verify(issueRepository).save(any(Issue.class));
        assertEquals("in_progress", testIssue.getStatus());
    }
}
