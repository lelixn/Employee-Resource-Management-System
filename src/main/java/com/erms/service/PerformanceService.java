package com.erms.service;

import com.erms.model.Performance;
import com.erms.repository.PerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PerformanceService {

    @Autowired
    private PerformanceRepository repo;

    public List<Performance> getAll() {
        return repo.findAll();
    }

    public Performance getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Performance> getByEmployeeId(Long employeeId) {
        return repo.findByEmployeeId(employeeId);
    }

    public Performance save(Performance performance) {
        return repo.save(performance);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

