package com.erms.service;

import com.erms.model.Attendance;
import com.erms.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository repo;

    public List<Attendance> getAll() {
        return repo.findAll();
    }

    public Attendance save(Attendance attendance) {
        return repo.save(attendance);
    }

    public List<Attendance> getByEmployee(Long employeeId) {
        return repo.findByEmployeeId(employeeId);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

