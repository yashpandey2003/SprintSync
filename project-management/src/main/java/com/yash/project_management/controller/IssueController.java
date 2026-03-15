package com.yash.project_management.controller;

import com.yash.project_management.DTO.IssueDTO;
import com.yash.project_management.model.Issue;
import com.yash.project_management.model.User;
import com.yash.project_management.response.MessageResponse;
import com.yash.project_management.request.IssueRequest;
import com.yash.project_management.service.IssueService;
import com.yash.project_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;
    private final UserService userService;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssue(@PathVariable("issueId") Long issueId) throws Exception {
        return ResponseEntity.ok(issueService.getIssueById(issueId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssueByProjectId(@PathVariable("projectId") Long projectId) throws Exception {
        return ResponseEntity.ok(issueService.getIssueByProjectId(projectId));
    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(
            @RequestBody IssueRequest issue,
            @RequestHeader("Authorization") String token) throws Exception {
        User tokenUser = userService.findUserProfileByJwt(token);
        Issue createdIssue = issueService.createIssue(issue, tokenUser);
        
        IssueDTO issueDTO = IssueDTO.builder()
                .id(createdIssue.getId())
                .title(createdIssue.getTitle())
                .description(createdIssue.getDescription())
                .status(createdIssue.getStatus())
                .projectID(createdIssue.getProjectID())
                .priority(createdIssue.getPriority())
                .dueDate(createdIssue.getDueDate())
                .tags(createdIssue.getTags())
                .project(createdIssue.getProject())
                .assignee(createdIssue.getAssignee())
                .build();

        return ResponseEntity.ok(issueDTO);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssue(
            @PathVariable("issueId") Long issueId,
            @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserProfileByJwt(token);
        issueService.deleteIssue(issueId, user.getId());
        MessageResponse res = new MessageResponse("Issue deleted");
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(
            @PathVariable("issueId") Long issueId,
            @PathVariable("userId") Long userId) throws Exception {
        Issue issue = issueService.addUserToIssue(issueId, userId);
        return ResponseEntity.ok(issue);
    }

    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(
            @PathVariable("status") String status,
            @PathVariable("issueId") Long issueId) throws Exception {
        Issue issue = issueService.updateStatus(issueId, status);
        return ResponseEntity.ok(issue);
    }
}
