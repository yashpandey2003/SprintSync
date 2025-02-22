package com.yash.project_management.service;

import com.yash.project_management.model.Chat;
import com.yash.project_management.model.Project;
import com.yash.project_management.model.User;

import java.util.List;

public interface ProjectService {
    Project createProject(Project project, User user) throws Exception;
    List<Project> getProjectByTeam(User user,String category, String tag) throws Exception;
    Project getProjectById(Long projectId) throws Exception;
    void deleteProject(Long projectId, Long userId) throws Exception;
    Project updateProject(Project updateProject, Long id) throws Exception;
    void addUserToProject(Long projectId, Long userId) throws Exception;
    void removeUserFromProject(Long projectId, Long userId) throws Exception;
    Chat getChatByProjectId(Long projectId) throws Exception;
}
