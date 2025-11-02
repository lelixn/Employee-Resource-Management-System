import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterPage implements OnInit {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ Clear any previous registration data
    this.name = '';
    this.email = '';
    this.password = '';
  }

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      this.message = 'All fields are required!';
      return;
    }

    localStorage.setItem('registeredUser', JSON.stringify({
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'EMPLOYEE'
    }));

    this.message = '✅ Registration successful!';
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }

  goToLogin() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      this.router.navigate(['/login']);
      document.body.classList.remove('fade-out');
    }, 400);
  }
}
