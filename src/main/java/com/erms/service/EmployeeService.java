package com.erms.service;

import com.erms.model.Employee;
import java.util.List;

public interface EmployeeService {
    List<Employee> getAll();
    Employee getById(Long id);
    Employee create(Employee emp);
    Employee update(Long id, Employee emp);
    void delete(Long id);
}
