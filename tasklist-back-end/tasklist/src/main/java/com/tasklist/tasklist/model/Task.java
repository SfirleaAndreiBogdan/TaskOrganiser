package com.tasklist.tasklist.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table
public class Task {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    
    @Column(name="id")
    private Long id;
    @Column(name="task")
    private String name;
    @Column(name="description")
    private String description;
    @Column(name="status")
    private boolean completed;
    @Column(name = "date")
    private LocalDate date;
    @Column(name = "time")
    private LocalTime time;
    public Task(){}
    public Task(Long id, String name, String description, boolean completed,LocalDate date,LocalTime time) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.completed = completed;
        this.date=date;
        this.time=time;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
