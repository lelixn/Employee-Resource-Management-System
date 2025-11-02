import { Injectable } from '@angular/core';

interface User {
  name: string;
  email: string;
  password: string;
  role: 'HR' | 'EMPLOYEE';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  getToken() {
    throw new Error('Method not implemented.');
  }
  getUser() {
    throw new Error('Method not implemented.');
  }
  private users: User[] = [
    { name: 'Admin HR', email: 'hr@erms.com', password: 'admin123', role: 'HR' }
  ];

  constructor() {
    // Load from localStorage if exists
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }

  register(user: User): string {
    // Validate inputs
    if (!user.name || !user.email || !user.password) {
      return 'All fields are required!';
    }
    if (!this.isValidEmail(user.email)) {
      return 'Invalid email format!';
    }

    // Only one HR allowed
    if (user.email === 'hr@erms.com') {
      return 'HR account already exists.';
    }

    // If already registered
    const exists = this.users.find(u => u.email === user.email);
    if (exists) {
      return 'User already exists!';
    }

    // Assign role automatically
    user.role = 'EMPLOYEE';
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return 'SUCCESS';
  }

  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    return user || null;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}












// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { BehaviorSubject, tap } from 'rxjs';

// export interface UserPayload { id: number; email: string; role: 'ADMIN'|'EMPLOYEE'|string; name?: string; }
// export interface LoginResp { token: string; user: UserPayload; }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private api = 'http://localhost:8080/api/auth';
//   private user$ = new BehaviorSubject<UserPayload | null>(this.getStoredUser());

//   constructor(private http: HttpClient, private router: Router) {}

//   login(email: string, password: string) {
//     return this.http.post<LoginResp>(`${this.api}/login`, { email, password }).pipe(
//       tap(resp => {
//         localStorage.setItem('token', resp.token);
//         localStorage.setItem('user', JSON.stringify(resp.user));
//         this.user$.next(resp.user);
//       })
//     );
//   }

//   register(payload: {email:string,password:string,name?:string}) {
//     return this.http.post(`${this.api}/register`, payload);
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     this.user$.next(null);
//     this.router.navigate(['/login']);
//   }

//   getToken() { return localStorage.getItem('token'); }
//   getUser() { return this.user$.value; }
//   getUser$() { return this.user$.asObservable(); }

//   private getStoredUser(): UserPayload | null {
//     const s = localStorage.getItem('user');
//     return s ? JSON.parse(s) : null;
//   }
// }
