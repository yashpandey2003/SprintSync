package com.yash.project_management.controller;

import com.yash.project_management.model.Chat;
import com.yash.project_management.model.Invitation;
import com.yash.project_management.model.Project;
import com.yash.project_management.model.User;
import com.yash.project_management.reponse.MessageResponse;
import com.yash.project_management.request.InvitationRequest;
import com.yash.project_management.service.InvitationService;
import com.yash.project_management.service.ProjectService;
import com.yash.project_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserService userService;

    @Autowired
    private InvitationService invitationService;

    @GetMapping
    public ResponseEntity<List<Project>> getProject(@RequestParam(required = false) String category, @RequestParam(required = false) String tag, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projects = projectService.getProjectByTeam(user, category, tag);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@RequestHeader("Authorization") String jwt, @PathVariable Long projectId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Project project = projectService.getProjectById(projectId);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestHeader("Authorization") String jwt, @RequestBody Project project) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Project createdProject = projectService.createProject(project, user);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }
    @PatchMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable Long projectId, @RequestHeader("Authorization") String jwt, @RequestBody Project project) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        Project updatedProject = projectService.updateProject(project, projectId);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }
    @DeleteMapping("/{projectId}")
    public ResponseEntity<MessageResponse> deleteProject(@PathVariable Long projectId, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        projectService.deleteProject(projectId, user.getId());
        MessageResponse res = new MessageResponse("project deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProject(@RequestParam(required = false) String keyword, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projects = projectService.searchProjects(keyword, user);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatByProjectId(@PathVariable Long projectId, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        Chat chat = projectService.getChatByProjectId(projectId);
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }
    @PostMapping("/invite")
    public ResponseEntity<MessageResponse> inviteProject(@RequestHeader("Authorization") String jwt, @RequestBody InvitationRequest request) throws Exception{
        invitationService.sendInvitation(request.getEmail(), request.getProjectId());
        MessageResponse res = new MessageResponse(("User invitation sent"));
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation> acceptInvite(@RequestHeader("Authorization") String jwt, @RequestParam String token) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        Invitation invitation = invitationService.acceptInvitation(token, user.getId());
        projectService.addUserToProject(invitation.getProjectId(), user.getId());
        return new ResponseEntity<>(invitation, HttpStatus.ACCEPTED);
    }





}
