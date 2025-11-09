package com.erms.repository;

import com.erms.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Find all attendance records for a specific employee
    List<Attendance> findByEmployeeId(Long employeeId);

    // Find attendance records for a specific date
    List<Attendance> findByDate(LocalDate date);
}
