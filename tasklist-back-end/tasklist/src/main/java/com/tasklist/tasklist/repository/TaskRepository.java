package com.tasklist.tasklist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tasklist.tasklist.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
