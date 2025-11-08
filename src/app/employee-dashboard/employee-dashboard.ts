import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent implements OnInit, AfterViewInit {

  employee: any = {}; 
  assignedTasks: any = {
    project: null,
    attendance: null,
    tasks: []
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Get logged-in employee
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const allEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const currentEmp = allEmployees.find((e: any) => e.email === loggedInUser.email);

    // ✅ Assign correct employee info
    this.employee = currentEmp || loggedInUser;

    // ✅ Load assigned data (from HR)
    this.loadAssignedData();

    // ✅ Listen for real-time HR updates
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key?.startsWith('assigned_')) {
        this.loadAssignedData();
      }
    });
  }

  // 🔁 Helper: Load assigned project/task/attendance from localStorage
  loadAssignedData() {
    if (!this.employee.email) return;

    const assignedData = localStorage.getItem(`assigned_${this.employee.email}`);
    if (assignedData) {
      this.assignedTasks = JSON.parse(assignedData);
    } else {
      this.assignedTasks = {
        project: null,
        attendance: null,
        tasks: []
      };
    }
  }

  // ⚙ Navigate to settings
  openSettings() {
    this.router.navigate(['/employee-settings']);
  }

  ngAfterViewInit(): void {
    gsap.from('.profile-card', { y: 50, opacity: 0, duration: 1 });
    gsap.from('.overview-card', { y: 40, opacity: 0, stagger: 0.2, duration: 1 });
    gsap.from('.tasks', { y: 50, opacity: 0, duration: 1 });
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
}
