package com.erms.controller;

import com.erms.model.Employee;
import com.erms.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private EmployeeRepository employeeRepository;

 
    @PostMapping("/hr/login")
    public ResponseEntity<?> hrLogin(@RequestBody Employee login) {
        if ("hr@erms.com".equals(login.getEmail()) && "123456".equals(login.getPassword())) {
            return ResponseEntity.ok("{\"role\":\"HR\",\"email\":\"hr@erms.com\"}");
        }
        return ResponseEntity.status(401).body("Invalid HR credentials");
    }

    
    @PostMapping("/employee/login")
    public ResponseEntity<?> employeeLogin(@RequestBody Employee login) {
        Optional<Employee> emp = employeeRepository.findByEmail(login.getEmail());
        if (emp.isPresent() && emp.get().getPassword().equals(login.getPassword())) {
            return ResponseEntity.ok(emp.get());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
