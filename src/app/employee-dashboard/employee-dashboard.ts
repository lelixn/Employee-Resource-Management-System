import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent {
  employeeName = localStorage.getItem('loggedInUser') || 'Employee';

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
