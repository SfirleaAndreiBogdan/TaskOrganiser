package com.tasklist.tasklist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasklist.tasklist.model.Task;
import com.tasklist.tasklist.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public void deleteTasks(Long id) {
        taskRepository.deleteById(id);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task upadeTask(Long id, Task taskDetails){
        
        Task task = taskRepository.findById(id).orElse(null);
        
        if(task!=null){
            task.setDescription(taskDetails.getDescription());
            task.setCompleted(taskDetails.isCompleted());
            return taskRepository.save(task);
        }
        
        return null;
    }

    public Task updateTaskStatus(Long id, boolean status) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setCompleted(status);
            taskRepository.save(task);
        }
        return task;
    }
}
