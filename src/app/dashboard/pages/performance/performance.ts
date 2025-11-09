import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceService } from '../../../services/performance.service';
import { EmployeeService } from '../../../services/employee';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.html',
  styleUrls: ['./performance.css']
})
export class PerformanceComponent implements OnInit {
  performanceData: any[] = [];
  overallScore = 0;
  employees: any[] = [];

  constructor(
    private perfService: PerformanceService,
    private empService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadPerformance();
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getAllEmployees().subscribe({
      next: (data: any[]) => {
        // Load employee assignments from localStorage and merge with employee data
        this.employees = data.map(emp => {
          const assignment = localStorage.getItem(`assigned_${emp.email}`);
          const assigned = assignment ? JSON.parse(assignment) : null;
          
          return {
            ...emp,
            attendance: assigned?.attendance || Math.floor(Math.random() * 20) + 80,
            tasksCompleted: assigned?.tasks?.length || Math.floor(Math.random() * 5) + 3,
            totalTasks: (assigned?.tasks?.length || 5) + Math.floor(Math.random() * 3),
            rating: (Math.random() * 2 + 3).toFixed(1) // Random rating between 3-5
          };
        });
      },
      error: () => {
        // Fallback: use sample data if API fails
        this.employees = [
          {
            id: 1,
            name: 'John Doe',
            department: 'Engineering',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            attendance: 95,
            tasksCompleted: 8,
            totalTasks: 10,
            rating: 4.5
          },
          {
            id: 2,
            name: 'Jane Smith',
            department: 'HR',
            image: 'https://randomuser.me/api/portraits/women/1.jpg',
            attendance: 88,
            tasksCompleted: 7,
            totalTasks: 9,
            rating: 4.2
          }
        ];
      }
    });
  }

  loadPerformance() {
    this.perfService.getAll().subscribe({
      next: (data: any[]) => {
        this.performanceData = data;
        this.overallScore = this.calculateAverage(data);
        this.renderChart();
      }
    });
  }

  calculateAverage(data: any[]): number {
    if (!data.length) return 0;
    const total = data.reduce((sum, p) => sum + (p.value || p.score || 0), 0);
    return Math.round(total / data.length);
  }

  getOverallAverage(): number {
    if (this.employees.length === 0) return 0;
    const total = this.employees.reduce((sum, emp) => {
      return sum + this.calculatePerformance(emp);
    }, 0);
    return Math.round(total / this.employees.length);
  }

  calculatePerformance(emp: any): number {
    if (!emp) return 0;
    const attendanceWeight = 0.3;
    const taskWeight = 0.5;
    const ratingWeight = 0.2;

    const attendanceScore = emp.attendance || 0;
    const taskScore = emp.totalTasks > 0 
      ? (emp.tasksCompleted / emp.totalTasks) * 100 
      : 0;
    const ratingScore = (emp.rating || 0) * 20; // Convert 5-star to 100 scale

    return Math.round(
      attendanceScore * attendanceWeight +
      taskScore * taskWeight +
      ratingScore * ratingWeight
    );
  }

  getPerformanceColor(score: number): string {
    if (score >= 80) return '#22c55e'; // Green
    if (score >= 60) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  }

  renderChart() {
    const canvas = document.getElementById('performanceChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.performanceData.map((p) => `Emp ${p.employeeId}`),
        datasets: [
          {
            label: 'Performance Score',
            data: this.performanceData.map((p) => p.value || p.score || 0),
            backgroundColor: 'rgba(0, 255, 180, 0.4)',
            borderColor: '#00ffcc',
            borderWidth: 1
          }
        ]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }
}
