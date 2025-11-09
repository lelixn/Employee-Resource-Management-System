import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      delay(300),
      catchError(() => {
        // Fallback to localStorage
        const stored = localStorage.getItem('employees');
        if (stored) {
          return of(JSON.parse(stored)).pipe(delay(200));
        }
        // Return empty array if no data
        return of([]);
      })
    );
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.baseUrl, employee).pipe(
      delay(300),
      catchError(() => {
        // Fallback: save to localStorage
        const stored = localStorage.getItem('employees');
        const employees = stored ? JSON.parse(stored) : [];
        const newEmployee = { ...employee, id: employee.id || Date.now() };
        employees.push(newEmployee);
        localStorage.setItem('employees', JSON.stringify(employees));
        return of(newEmployee).pipe(delay(200));
      })
    );
  }


  assignTask(id: number | string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/assign`, data).pipe(
      delay(300),
      catchError(() => {
        // Fallback: save to localStorage
        const stored = localStorage.getItem('employees');
        if (stored) {
          const employees = JSON.parse(stored);
          const emp = employees.find((e: any) => e.id === id || e.email === id);
          if (emp) {
            localStorage.setItem(`assigned_${emp.email}`, JSON.stringify(data));
            return of({ success: true }).pipe(delay(200));
          }
        }
        return throwError(() => new Error('Employee not found'));
      })
    );
  }

  // ✅ Delete employee with fallback
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      delay(300),
      catchError(() => {
        // Fallback: delete from localStorage
        const stored = localStorage.getItem('employees');
        if (stored) {
          const employees = JSON.parse(stored);
          const filtered = employees.filter((e: any) => e.id !== id);
          localStorage.setItem('employees', JSON.stringify(filtered));
          return of({ success: true }).pipe(delay(200));
        }
        return throwError(() => new Error('Employee not found'));
      })
    );
  }


  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      delay(300),
      catchError(() => {
        // Fallback: get from localStorage
        const stored = localStorage.getItem('employees');
        if (stored) {
          const employees = JSON.parse(stored);
          const emp = employees.find((e: any) => e.id === id);
          if (emp) {
            return of(emp).pipe(delay(200));
          }
        }
        return throwError(() => new Error('Employee not found'));
      })
    );
  }
}
