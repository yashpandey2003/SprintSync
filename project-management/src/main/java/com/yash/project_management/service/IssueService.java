package com.yash.project_management.service;

import com.yash.project_management.model.Issue;

import java.util.Optional;

public interface IssueService {
    Optional<Issue> getIssueById(Long issueId) throws Exception;
}
