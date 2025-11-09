import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  message: any;
  email = '';
  password = '';
  role = 'EMPLOYEE'; // Default to Employee

  constructor(private authService: AuthService, private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    if (!this.email.trim() || !this.password.trim()) {
      this.message = '❌ Please enter email and password';
      return;
    }

    const credentials = { email: this.email.trim(), password: this.password.trim() };

    // Check if it's an HR email
    const hrEmails = ['hr@erms.com', 'admin@erms.com', 'hr@example.com'];
    const isHREmail = hrEmails.includes(this.email.toLowerCase());

    if (this.role === 'HR' || isHREmail) {
      // Try HR login first
      this.authService.hrLogin(credentials).subscribe({
        next: (res: any) => {
          localStorage.setItem('role', 'HR');
          this.authService.saveUser(res);
          this.router.navigate(['/dashboard/overview']);
        },
        error: () => {
          // If HR login fails, try as employee
          this.tryEmployeeLogin(credentials);
        }
      });
    } else {
      // Employee login
      this.tryEmployeeLogin(credentials);
    }
  }

  private tryEmployeeLogin(credentials: any) {
    this.authService.employeeLogin(credentials).subscribe({
      next: (emp: any) => {
        localStorage.setItem('role', 'EMPLOYEE');
        this.authService.saveUser(emp);
        this.router.navigate(['/employee-dashboard']);
      },
      error: () => {
        this.message = '❌ Invalid credentials. Please check your email and password.';
      }
    });
  }
}
