import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPage {
  email = '';
  password = '';
errorMessage: any;

  constructor(private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('⚠️ Please fill in all fields!');
      return;
    }

    const hrEmail = 'lelinpanda35@gmail.com';
    const hrPass = 'admin123';

    if (this.email === hrEmail && this.password === hrPass) {
      // ✅ HR Login
      localStorage.setItem('role', 'HR');
      localStorage.setItem('loggedInUser', this.email);
      this.router.navigate(['/dashboard']);
    } else {
      // ✅ Employee Login
      localStorage.setItem('role', 'EMPLOYEE');
      localStorage.setItem('loggedInUser', this.email);
      this.router.navigate(['/employee-dashboard']);
    }
  }
}
