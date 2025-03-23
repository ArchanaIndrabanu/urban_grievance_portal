package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Issue;
import java.util.List;

public interface IssueService {
    void saveIssue(Issue issue);
    List<Issue> getAllIssues();
}
