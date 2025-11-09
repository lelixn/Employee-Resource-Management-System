package com.erms.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "leave_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private String reason;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String status;
	public void setStatus(String status2) {
		// TODO Auto-generated method stub
		
	} 
}
