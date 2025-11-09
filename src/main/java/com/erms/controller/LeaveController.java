package com.erms.controller;

import com.erms.model.LeaveRequest;
import com.erms.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:4200")
public class LeaveController {

    @Autowired
    private LeaveService service;

    @GetMapping
    public List<LeaveRequest> getAll() {
        return service.getAll();
    }

    @PostMapping
    public LeaveRequest applyLeave(@RequestBody LeaveRequest leave) {
        leave.setStatus("PENDING");
        return service.save(leave);
    }

    @PutMapping("/{id}/{status}")
    public LeaveRequest updateStatus(@PathVariable Long id, @PathVariable String status) {
        return service.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
