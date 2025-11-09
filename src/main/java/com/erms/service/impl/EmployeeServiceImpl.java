package com.erms.service.impl;
import com.erms.model.Employee;

import com.erms.repository.EmployeeRepository;
import com.erms.service.EmployeeService;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    @Override
    public List<Employee> getAll() {
        return repo.findAll();
    }

    @Override
    public Employee getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Employee create(Employee emp) {
        emp.setId(null); // ensure new
        return repo.save(emp);
    }

    @Override
    public Employee update(Long id, Employee emp) {
        return repo.findById(id).map(existing -> {
            existing.setName(emp.getName());
            existing.setEmail(emp.getEmail());
            existing.setDepartment(emp.getDepartment());
            existing.setSalary(emp.getSalary());
            existing.setImage(emp.getImage());
            return repo.save(existing);
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
