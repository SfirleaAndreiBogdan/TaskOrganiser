package com.tasklist.tasklist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tasklist.tasklist.model.Task;
import com.tasklist.tasklist.repository.TaskRepository;
import com.tasklist.tasklist.service.TaskService;



@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {


    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;
    @GetMapping
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        Task task = taskRepository.findById(id).orElse(null);
        if(task==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(task);
    }

    @PostMapping("/add")
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id , @RequestBody Task taskDetails){
        Task upTask = taskRepository.findById(id).orElse(null);

        if(upTask==null){
            return ResponseEntity.notFound().build();
        }
        upTask.setName(taskDetails.getName());
        upTask.setDescription(taskDetails.getDescription());
        upTask.setDate(taskDetails.getDate());
        upTask.setTime(taskDetails.getTime());
        upTask.setCompleted(false);

        Task updatedTask = taskRepository.save(upTask);
        return ResponseEntity.ok(updatedTask);
    }

    @PatchMapping("/{id}/status")
    public Task updateTaskStatus(@PathVariable Long id, @RequestParam boolean status) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setCompleted(status);
            taskRepository.save(task);
        }
        return task;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        taskService.deleteTasks(id);
        return ResponseEntity.noContent().build();
    }
}
