import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-leaves',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leaves.html',
  styleUrls: ['./leaves.css']
})
export class EmployeeLeavesComponent implements OnInit {
  leave = { from: '', to: '', reason: '' };
  leaves: any[] = [];
  employee: any = {};

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.employee = user;
  
    this.loadLeaves();
    window.addEventListener('storage', () => this.loadLeaves());
  }
  
  loadLeaves() {
    const allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]');
    this.leaves = allLeaves.filter((l: any) => l.email === this.employee.email);
  }
  applyLeave() {
    if (!this.leave.from || !this.leave.to || !this.leave.reason.trim()) {
      alert('⚠ Please fill in all fields.');
      return;
    }

    const newLeave = {
      email: this.employee.email,
      name: this.employee.name,
      from: this.leave.from,   
      to: this.leave.to,       
      reason: this.leave.reason,
      status: 'Pending',
      id: Date.now()
    };
    

    const allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]');
    allLeaves.push(newLeave);
    localStorage.setItem('leaves', JSON.stringify(allLeaves));

    this.leaves.push(newLeave);
    this.leave = { from: '', to: '', reason: '' };
    alert('✅ Leave request submitted successfully!');
  }
}
