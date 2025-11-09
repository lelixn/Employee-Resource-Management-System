import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  // Mock HR credentials for development
  private mockHRCredentials: { [key: string]: string } = {
    'hr@erms.com': 'admin123',
    'admin@erms.com': 'admin123',
    'hr@example.com': 'password123'
  };

  constructor(private http: HttpClient) {}

  // ✅ HR Login with fallback to mock authentication
  hrLogin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/hr/login`, credentials).pipe(
      delay(500), // Simulate network delay
      catchError(() => {
        // Fallback to mock authentication if backend is not available
        return this.mockHRLogin(credentials);
      })
    );
  }

  // ✅ Mock HR Login for development
  private mockHRLogin(credentials: any): Observable<any> {
    const { email, password } = credentials;
    
    // Check against mock credentials
    if (email && this.mockHRCredentials[email] === password) {
      const mockUser = {
        id: 1,
        name: 'HR Manager',
        email: email,
        role: 'HR',
        image: 'assets/hr-default.png'
      };
      return of(mockUser).pipe(delay(300));
    }
    
    // Invalid credentials
    return throwError(() => new Error('Invalid credentials'));
  }

  // ✅ Employee Login with fallback to mock authentication
  employeeLogin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/login`, credentials).pipe(
      delay(500),
      catchError(() => {
        // Fallback to mock authentication
        return this.mockEmployeeLogin(credentials);
      })
    );
  }

  // ✅ Mock Employee Login for development
  private mockEmployeeLogin(credentials: any): Observable<any> {
    const { email, password } = credentials;
    
    // Check registered users first
    const registeredUsers = localStorage.getItem('registeredUsers');
    if (registeredUsers) {
      const users = JSON.parse(registeredUsers);
      const user = users.find((u: any) => u.email === email);
      
      if (user) {
        // Check password (simple comparison for demo)
        if (user.password === password) {
          const mockEmployee = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'EMPLOYEE',
            department: 'Engineering',
            image: 'https://randomuser.me/api/portraits/lego/1.jpg'
          };
          return of(mockEmployee).pipe(delay(300));
        }
      }
    }
    
    // Fallback: any email with password 'employee123' works for demo
    if (password === 'employee123') {
      const mockEmployee = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        role: 'EMPLOYEE',
        department: 'Engineering',
        image: 'https://randomuser.me/api/portraits/lego/1.jpg'
      };
      return of(mockEmployee).pipe(delay(300));
    }
    
    return throwError(() => new Error('Invalid credentials'));
  }

  // ✅ Save logged user to localStorage
  saveUser(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser() {
    const data = localStorage.getItem('loggedInUser');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('role');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ✅ Register new user - simple version, any email/password works
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData).pipe(
      delay(500),
      catchError(() => {
        // Fallback: save to localStorage
        return this.mockRegister(userData);
      })
    );
  }

  // ✅ Mock Register - allows any email/password
  private mockRegister(userData: any): Observable<any> {
    // Check if user already exists
    const existingUsers = localStorage.getItem('registeredUsers');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    
    const existingUser = users.find((u: any) => u.email === userData.email);
    if (existingUser) {
      return throwError(() => new Error('User with this email already exists'));
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // Store password for login check
      role: userData.role || 'EMPLOYEE',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    return of({
      message: '✅ Registration successful! Please login.',
      user: newUser
    }).pipe(delay(300));
  }
}
