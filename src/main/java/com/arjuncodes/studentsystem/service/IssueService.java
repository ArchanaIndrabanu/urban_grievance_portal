package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Issue;

import java.util.List;
import java.util.Optional;

public interface IssueService {
    void saveIssue(Issue issue);
    List<Issue> getAllIssues();
    Optional<Issue> getIssueById(Long id); // Fetch issue by ID
    List<Issue> getIssuesByStatus(String status); // Fetch issues by status
}
