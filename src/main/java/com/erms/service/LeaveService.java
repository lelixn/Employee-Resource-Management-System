package com.erms.service;

import com.erms.model.LeaveRequest;
import com.erms.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository repo;

    public List<LeaveRequest> getAll() { return repo.findAll(); }
    public LeaveRequest save(LeaveRequest leave) { return repo.save(leave); }
    public LeaveRequest updateStatus(Long id, String status) {
        LeaveRequest req = repo.findById(id).orElseThrow();
        req.setStatus(status);
        return repo.save(req);
    }
    public void delete(Long id) { repo.deleteById(id); }
}
