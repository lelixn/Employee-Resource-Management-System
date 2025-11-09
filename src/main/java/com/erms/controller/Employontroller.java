package com.erms.controller;

import com.erms.model.Employee;
import com.erms.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/employees")
public class Employontroller {

    @Autowired
    private EmployeeRepository employeeRepo;

    @GetMapping
    public List<Employee> getAll() {
        return employeeRepo.findAll();
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee emp) {
        return employeeRepo.save(emp);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable Long id) {
        return employeeRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ HR assigns project/tasks/attendance
    @PutMapping("/{id}/assign")
    public ResponseEntity<Employee> assignTask(
            @PathVariable Long id,
            @RequestBody Employee updated) {
        return employeeRepo.findById(id).map(emp -> {
            emp.setAssignedProject(updated.getAssignedProject());
            emp.setAttendance(updated.getAttendance());
            emp.setTasks(updated.getTasks());
            return ResponseEntity.ok(employeeRepo.save(emp));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
