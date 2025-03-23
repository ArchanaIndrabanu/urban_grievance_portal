package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, Long> {
}
