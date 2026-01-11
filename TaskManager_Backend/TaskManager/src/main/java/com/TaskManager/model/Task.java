package com.TaskManager.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDateTime createdAT;
    private  LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    public void  create(){
        this.createdAT=LocalDateTime.now();
        this.updatedAt=LocalDateTime.now();
        this.status=Status.TODO;
    }

    @PreUpdate
    public void update(){
        this.updatedAt=LocalDateTime.now();
    }

}
