import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-task-modal.html',
  styleUrls: ['./assign-task-modal.css']
})
export class AssignTaskModalComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  employees = JSON.parse(localStorage.getItem('employees') || '[]');

  formData = {
    email: '',
    project: '',
    task: '',
    attendance: '',
    deadline: ''
  };

  assignTask() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const index = employees.findIndex((e: any) => e.email === this.formData.email);

    if (index !== -1) {
      employees[index].project = this.formData.project;
      employees[index].task = this.formData.task;
      employees[index].attendance = this.formData.attendance;
      employees[index].deadline = this.formData.deadline;

      localStorage.setItem('employees', JSON.stringify(employees));

      alert(`✅ Task assigned to ${employees[index].name}!`);
      this.close.emit();
    } else {
      alert('❌ Employee not found.');
    }
  }
}
