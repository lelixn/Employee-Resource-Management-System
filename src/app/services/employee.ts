import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private STORAGE_KEY = 'employeesData';
  private employees: Employee[] = [];

  constructor() {
    // Load from localStorage if available
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    this.employees = savedData ? JSON.parse(savedData) : [
      {
        id: 1,
        name: 'Aisha Khan',
        email: 'aisha.khan@example.com',
        department: 'Engineering',
        salary: 55000,
        image: 'https://randomuser.me/api/portraits/women/65.jpg'
      },
      {
        id: 2,
        name: 'Ravi Patel',
        email: 'ravi.patel@example.com',
        department: 'HR',
        salary: 48000,
        image: 'https://randomuser.me/api/portraits/men/43.jpg'
      },
      {
        id: 3,
        name: 'Meera Sen',
        email: 'meera.sen@example.com',
        department: 'Finance',
        salary: 60000,
        image: 'https://randomuser.me/api/portraits/women/67.jpg'
      }
    ];
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.employees));
  }

  getAll(): Observable<Employee[]> {
    return of(this.employees);
  }

  add(emp: Employee) {
    emp.id = Date.now();
    this.employees.push(emp);
    this.saveToLocalStorage();
    return of(emp);
  }

  update(updated: Employee) {
    const index = this.employees.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this.employees[index] = updated;
      this.saveToLocalStorage();
    }
    return of(updated);
  }

  delete(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
    this.saveToLocalStorage();
    return of(true);
  }
}
