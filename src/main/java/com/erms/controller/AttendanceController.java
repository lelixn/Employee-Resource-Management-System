package com.erms.controller;

import com.erms.model.Attendance;
import com.erms.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:4200")
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @GetMapping
    public List<Attendance> all() {
        return service.getAll();
    }

    @GetMapping("/employee/{employeeId}")
    public List<Attendance> byEmployee(@PathVariable Long employeeId) {
        return service.getByEmployee(employeeId);
    }

    @PostMapping
    public Attendance create(@RequestBody Attendance attendance) {
        return service.save(attendance);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
