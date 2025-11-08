import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSyncService {
  getAll() {
    throw new Error('Method not implemented.');
  }
  private employeeSource = new BehaviorSubject<any>(null);
  employee$ = this.employeeSource.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.employeeSource.next(JSON.parse(storedUser));
    }

    // Listen to HR or profile updates
    window.addEventListener('storage', () => {
      const updated = localStorage.getItem('loggedInUser');
      if (updated) {
        this.employeeSource.next(JSON.parse(updated));
      }
    });
  }

  updateEmployee(employee: any) {
    this.employeeSource.next(employee);
    localStorage.setItem('loggedInUser', JSON.stringify(employee));
  }

  updateTasks(tasks: any[]) {
    const current = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    current.tasks = tasks;
    localStorage.setItem('loggedInUser', JSON.stringify(current));
    this.employeeSource.next(current);
  }

  updateTheme(theme: string) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    localStorage.setItem('themeChangeEvent', `${Date.now()}`);
  }
}
