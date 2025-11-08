import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.html',
  styleUrls: ['./performance.css']
})
export class PerformanceComponent implements OnInit, AfterViewInit {

  employees: any[] = [];
  isHR: boolean = false;

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isHR = role === 'HR';

    if (this.isHR) {
      // ✅ FIXED: load from correct key
      const stored = localStorage.getItem('employees');
      this.employees = stored ? JSON.parse(stored) : [];

      // Add calculated/simulated performance data
      this.employees = this.employees.map((emp: any) => ({
        ...emp,
        attendance: emp.attendance || Math.floor(Math.random() * (100 - 75) + 75),
        tasksCompleted: emp.tasksCompleted || Math.floor(Math.random() * 10),
        totalTasks: 10,
        rating: emp.rating || Math.floor(Math.random() * (5 - 3) + 3)
      }));

      localStorage.setItem('employees', JSON.stringify(this.employees));
    } else {
      // For employee login
      const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      if (user && user.email) {
        this.employees = [{
          ...user,
          attendance: user.attendance || Math.floor(Math.random() * (100 - 80) + 80),
          tasksCompleted: user.tasksCompleted || Math.floor(Math.random() * 10),
          totalTasks: 10,
          rating: user.rating || Math.floor(Math.random() * (5 - 3) + 3)
        }];
      }
    }
  }

  ngAfterViewInit(): void {
    gsap.from('.employee-card', { opacity: 0, y: 30, duration: 0.8, stagger: 0.2 });
  }

  getPerformanceColor(percentage: number): string {
    if (percentage > 85) return '#4caf50';
    if (percentage >= 70) return '#ffc107';
    return '#f44336';
  }

  calculatePerformance(emp: any): number {
    return Math.floor(((emp.tasksCompleted / emp.totalTasks) * 0.5 + (emp.attendance / 100) * 0.5) * 100);
  }

  getOverallAverage(): number {
    if (!this.employees.length) return 0;
    const total = this.employees.reduce((sum, e) => sum + this.calculatePerformance(e), 0);
    return Math.round(total / this.employees.length);
  }
}
