import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent implements OnInit, AfterViewInit {
goToLeavePage() {
  this.router.navigate(['/employee-dashboard/leaves']);
}

  employee: any = {}; 
  assignedTasks: any = {
    project: null,
    attendance: null,
    tasks: []
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const allEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const currentEmp = allEmployees.find((e: any) => e.email === loggedInUser.email);

    
    this.employee = currentEmp || loggedInUser;

    
    this.loadAssignedData();

    
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key?.startsWith('assigned_')) {
        this.loadAssignedData();
      }
    });
  }

  
  loadAssignedData() {
    if (!this.employee.email) return;

    const assignedData = localStorage.getItem(`assigned_${this.employee.email}`);
    if (assignedData) {
      const data = JSON.parse(assignedData);
      // Handle both old and new data structures
      this.assignedTasks = {
        project: data.projects?.[0] || data.project || null,
        attendance: data.attendance || null,
        tasks: data.tasks || []
      };
    } else {
      this.assignedTasks = {
        project: null,
        attendance: null,
        tasks: []
      };
    }
  }

  
  ngAfterViewInit(): void {
    gsap.from('.profile-card', { y: 50, opacity: 0, duration: 1 });
    gsap.from('.overview-card', { y: 40, opacity: 0, stagger: 0.2, duration: 1 });
    gsap.from('.tasks', { y: 50, opacity: 0, duration: 1 });

   
    setInterval(() => {
      this.loadAssignedData();
    }, 2000);

   
    window.addEventListener('focus', () => {
      this.loadAssignedData();
    });
  }


  openSettings() {
    this.router.navigate(['/employee-settings']);
  }


  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
}
