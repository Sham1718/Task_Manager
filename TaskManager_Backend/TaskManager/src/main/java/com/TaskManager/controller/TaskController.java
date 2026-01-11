package com.TaskManager.controller;


import com.TaskManager.dto.RequestStatus;
import com.TaskManager.dto.TaskRequest;
import com.TaskManager.model.Task;
import com.TaskManager.model.User;
import com.TaskManager.repository.UserRepo;
import com.TaskManager.service.ServiceUser;
import com.TaskManager.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService service;
    private final UserRepo repo;

    public TaskController(TaskService service, ServiceUser serviceUser, UserRepo repo) {
        this.service = service;
        this.repo = repo;

    }


    @PostMapping
    public ResponseEntity<Task> create(
            @RequestBody TaskRequest request,
            Principal principal
            ){
        User user=repo.findByUsername(principal.getName()).orElseThrow(RuntimeException::new);

        Task task=new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setUser(user);
        return  ResponseEntity.ok(
                service.create(task)
        );
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTask(){
        return ResponseEntity.ok(
         service.getAll()
       );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> getTaskById(
            @PathVariable Long id
    ){
        return ResponseEntity.ok(
          service.getTaskById(id)
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable long id,
            @RequestBody TaskRequest request
    ){
        return ResponseEntity.ok(
          service.update(id,request)
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity <String> deleteTask(
            @PathVariable long id,
            Principal principal
    ){
        return service.delete(id,principal);
    }

    @PatchMapping("/update/status/{id}")
    public ResponseEntity<String> updateStatus(
            @PathVariable long id,
            @RequestBody RequestStatus request,
            Principal principal
            ){
        return service.updateStatus(id,request,principal);

    }

}

