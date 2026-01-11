package com.TaskManager.service;

import com.TaskManager.dto.RequestStatus;
import com.TaskManager.dto.TaskRequest;
import com.TaskManager.model.Status;
import com.TaskManager.model.Task;
import com.TaskManager.model.User;
import com.TaskManager.repository.TaskRepo;
import com.TaskManager.repository.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepo repo;
    private final UserRepo userRepo;

    public TaskService(TaskRepo repo, UserRepo userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    public Task create(Task task){
       return repo.save(task);
    }

    public Optional<Task> getTaskById(long id){
        return repo.findById(id);
    }

    public List<Task> getAll(){
        return repo.findAll();
    }

    public Task update(long id, TaskRequest request){
        Task task =repo.findById(id).orElseThrow(()->new RuntimeException("No Task Found By Id"+id));
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        return repo.save(task);
    }

    public ResponseEntity<String> delete(long id, Principal principal){
        User user =userRepo.findByUsername(principal.getName()).orElseThrow(()->new RuntimeException("User Not found"));
        Task task=repo.findById(id).orElseThrow(()->new RuntimeException("no task found"));

        if (task.getUser().getId()!=user.getId()){
            return ResponseEntity.status(403).body("not owner of note");
        }
        repo.delete(task);
        return ResponseEntity.ok("Task deleted");
    }

    public ResponseEntity<String> updateStatus(long id, RequestStatus requestStatus, Principal principal){
        User user =userRepo.findByUsername(principal.getName()).orElseThrow(()->new RuntimeException("User Not found"));
        Task task=repo.findById(id).orElseThrow(()->new RuntimeException("no task found"));

        if (task.getUser().getId()!=user.getId()){
            return ResponseEntity.status(403).body("not owner of note");
        }
        task.setStatus(requestStatus.getStatus());
        repo.save(task);
        return ResponseEntity.ok("Task Status Updated") ;
    }
}
