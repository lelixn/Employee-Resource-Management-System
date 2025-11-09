package com.erms.controller;

import com.erms.model.Performance;
import com.erms.service.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/performance")
@CrossOrigin(origins = "http://localhost:4200")
public class PerformanceController {

    @Autowired
    private PerformanceService service;

    @GetMapping
    public List<Performance> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Performance getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Performance> getByEmployee(@PathVariable Long employeeId) {
        return service.getByEmployeeId(employeeId);
    }

    @PostMapping
    public Performance addPerformance(@RequestBody Performance performance) {
        return service.save(performance);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
