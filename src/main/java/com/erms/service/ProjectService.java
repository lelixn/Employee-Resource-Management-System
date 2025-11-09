package com.erms.service;

import com.erms.model.Project;
import com.erms.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repo;

    public List<Project> getAll() {
        return repo.findAll();
    }

    public Project getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Project save(Project project) {
        return repo.save(project);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
