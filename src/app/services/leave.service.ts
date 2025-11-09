import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private baseUrl = 'http://localhost:8080/api/leaves';

  constructor(private http: HttpClient) {}

  applyLeave(leave: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/apply`, leave);
  }

  getAllLeaves(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getLeavesByEmployee(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/employee/${id}`);
  }

  updateLeaveStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/status/${status}`, {});
  }
}
