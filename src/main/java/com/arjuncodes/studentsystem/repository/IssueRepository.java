package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByStatus(String status);
    List<Issue> findByUserId(int userId); // Added to fetch issues by userId
}