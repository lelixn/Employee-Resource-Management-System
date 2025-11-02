import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanvasNotesComponent } from "../../../components/canvas-notes/canvas-notes";
import { EmployeeService } from '../../../services/employee';

// import { CanvasNotesComponent_1 as CanvasNotesComponent } from "../../../components/canvas-notes/canvas-notes"; // ✅ adjust if needed

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, CanvasNotesComponent],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class EmployeesComponent {
   constructor(private svc: EmployeeService) {}
delete(_t15: { id: number; name: string; department: string; email: string; salary: number; image: string; }) {
throw new Error('Method not implemented.');
}
edit(_t15: { id: number; name: string; department: string; email: string; salary: number; image: string; }) {
throw new Error('Method not implemented.');
}
  employees = [
    { id: 1, name: 'Lelien Panda', department: 'Engineering', email: 'aisha.khan@example.com', salary: 55000, image: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: 2, name: 'Anshuman Pattanayak', department: 'HR', email: 'ravi.patel@example.com', salary: 48000, image: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: 3, name: 'Priyanshu Patra', department: 'Finance', email: 'meera.sen@example.com', salary: 60000, image: 'https://randomuser.me/api/portraits/women/68.jpg' }
  ];

  showCanvas = false;

  toggleCanvas() {
    this.showCanvas = !this.showCanvas;
  }
}
