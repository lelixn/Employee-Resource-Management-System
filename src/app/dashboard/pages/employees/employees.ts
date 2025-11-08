import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeSyncService } from '../../../services/employee';
import { OnInit } from '@angular/core';
import { AssignTaskModalComponent } from "../../../hr/assign-task-modal/assign-task-modal";


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, AssignTaskModalComponent],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class EmployeesComponent implements OnInit {

  employees: any[] = [];
  showModal = false;
  showForm = false;
  editingEmployee: any = null;
  newEmployee = { name: '', email: '', department: '', salary: '', image: '' };
  newProject = {
    name: '',
    employee: '',
    deadline: '',
    status: 'In Progress'
  };
  showAssignModal: false = false;
  

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    const stored = localStorage.getItem('employees');
    this.employees = stored ? JSON.parse(stored) : [];
  }

  saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  openAddForm() {
    this.showForm = true;
    this.editingEmployee = null;
    this.newEmployee = { name: '', email: '', department: '', salary: '', image: '' };
  }
  addOrUpdateEmployee() {
    if (this.editingEmployee) {
      // Update existing employee
      const index = this.employees.findIndex(e => e.email === this.editingEmployee.email);
      if (index !== -1) this.employees[index] = this.newEmployee;
      alert('✅ Employee updated successfully!');
    } else {
      // Add new employee
      this.employees.push({ ...this.newEmployee, role: 'EMPLOYEE' });
      alert('✅ New employee added!');
    }
    this.saveEmployees();
    this.showForm = false;
  }

  validateSalary(event: any) {
    const value = event.target.value;
    if (isNaN(value) || value < 0) {
      this.newEmployee.salary = '';
      alert('⚠️ Salary must be a valid positive number.');
    }
  }

  editEmployee(emp: any) {
    this.newEmployee = { ...emp };
    this.editingEmployee = emp;
    this.showForm = true;
  }

  deleteEmployee(email: string) {
    if (confirm('⚠️ Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter(e => e.email !== email);
      this.saveEmployees();
    }
  }

  openAssignModal() {
    this.showModal = true;
  }

  closeAssignModal() {
    this.showModal = false;
    this.loadEmployees(); // Refresh after assigning
  }


  assignProject(formValue: any) {
    const newProject = {
      name: formValue.projectName,
      employee: formValue.employeeName,
      deadline: formValue.deadline,
      status: formValue.status
    };

    console.log('🟢 Assigning project:', this.newProject);

    // Fetch existing projects from localStorage (or create empty array)
    const existing = JSON.parse(localStorage.getItem('assignProject') || '[]');

    // Push the new one
    existing.push(this.newProject);

    // Save back
    localStorage.setItem('assignProject', JSON.stringify(existing));

    console.log('✅ All projects now:', existing);
    alert('Project assigned successfully!');
  }

}








