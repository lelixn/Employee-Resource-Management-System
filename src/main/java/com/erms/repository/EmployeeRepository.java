package com.erms.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.erms.model.Employee;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	Optional<Employee> findByEmail(String email);
}
