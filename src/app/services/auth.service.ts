import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  password: string;
  role: 'HR' | 'EMPLOYEE';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private readonly HR_EMAIL = 'hr@erms.com';
  private readonly HR_PASS = 'admin123';

  constructor(private router: Router) {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) this.users = JSON.parse(savedUsers);
  }

  register(user: User): string {
    // Validate inputs
    if (!user.name || !user.email || !user.password)
      return '⚠️ All fields are required!';
    if (!this.validateEmail(user.email))
      return '⚠️ Invalid email format!';
    if (user.password.length < 5)
      return '⚠️ Password must be at least 5 characters.';

    // HR fixed email
    if (user.email === this.HR_EMAIL)
      return '⚠️ This email is reserved for HR!';

    // Check if already exists
    if (this.users.find(u => u.email === user.email))
      return '⚠️ Email already registered.';

    user.role = 'EMPLOYEE';
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return '✅ Registered successfully!';
  }

  login(email: string, password: string): string {
    if (!email || !password)
      return '⚠️ Enter both email and password.';

    // HR login
    if (email === this.HR_EMAIL && password === this.HR_PASS) {
      localStorage.setItem('role', 'HR');
      localStorage.setItem('loggedInUser', JSON.stringify({ email, role: 'HR' }));
      this.router.navigate(['/dashboard']);
      return '✅ Welcome back, HR!';
    }

    // Employee login
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) return '❌ Invalid credentials.';

    localStorage.setItem('role', user.role);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.router.navigate(['/employee-dashboard']);
    return '✅ Welcome back!';
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
