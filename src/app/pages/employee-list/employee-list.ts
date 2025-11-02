import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  image: string;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListPage {
  employees: Employee[] = [
    {
      id: 1,
      name: 'Aisha Khan',
      email: 'aisha.khan@example.com',
      department: 'Engineering',
      salary: 55000,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      name: 'Ravi Patel',
      email: 'ravi.patel@example.com',
      department: 'HR',
      salary: 48000,
      image: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 3,
      name: 'Meera Sen',
      email: 'meera.sen@example.com',
      department: 'Finance',
      salary: 60000,
      image: 'https://randomuser.me/api/portraits/women/46.jpg'
    }
  ];

  adding = false;
  editing = false;
  confirmingDelete = false;
  selectedEmployee: Employee | null = null;

  // 🔹 Add Employee
  addEmployee(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const newEmp: Employee = {
      id: Date.now(),
      name: data.get('name') as string,
      email: data.get('email') as string,
      department: data.get('department') as string,
      salary: Number(data.get('salary')),
      image: 'https://randomuser.me/api/portraits/lego/1.jpg'
    };

    this.employees.push(newEmp);
    this.adding = false;
    form.reset();
  }

  // 🔹 Edit Employee
  startEdit(emp: Employee) {
    this.selectedEmployee = { ...emp };
    this.editing = true;
  }

  updateEmployee(e: Event) {
    e.preventDefault();
    if (!this.selectedEmployee) return;

    const i = this.employees.findIndex(emp => emp.id === this.selectedEmployee!.id);
    if (i !== -1) this.employees[i] = { ...this.selectedEmployee! };

    this.editing = false;
    this.selectedEmployee = null;
  }

  // 🔹 Delete Employee
  confirmDelete(emp: Employee) {
    this.selectedEmployee = emp;
    this.confirmingDelete = true;
  }

  deleteEmployee() {
    if (!this.selectedEmployee) return;
    this.employees = this.employees.filter(e => e.id !== this.selectedEmployee!.id);
    this.confirmingDelete = false;
    this.selectedEmployee = null;
  }
}
