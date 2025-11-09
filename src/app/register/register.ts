import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Clear input autofill ghost values
    setTimeout(() => {
      this.name = '';
      this.email = '';
      this.password = '';
    }, 50);
  }

  register() {
    // Basic validation
    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      this.message = '❌ Please fill in all fields';
      return;
    }

    this.loading = true;
    this.message = '';

    const userData = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
      role: 'EMPLOYEE'
    };

    this.auth.register(userData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.message = response.message || '✅ Registration successful! Redirecting to login...';
        
        // Clear form
        this.name = '';
        this.email = '';
        this.password = '';
        
        // Redirect to login after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err: any) => {
        this.loading = false;
        this.message = err.error?.message || err.message || '❌ Registration failed. Please try again.';
        
        // If user already exists, suggest login
        if (err.message?.includes('already exists')) {
          setTimeout(() => {
            if (confirm('User already exists. Would you like to go to login page?')) {
              this.router.navigate(['/login']);
            }
          }, 1000);
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
