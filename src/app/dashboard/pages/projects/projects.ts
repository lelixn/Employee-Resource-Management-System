import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent {
  projects = [
    { name: 'ERP System', manager: 'Aisha Khan', deadline: 'Dec 2025', status: 'In Progress' },
    { name: 'Employee Portal', manager: 'Ravi Patel', deadline: 'Jan 2026', status: 'Completed' },
    { name: 'AI Attendance', manager: 'Meera Sen', deadline: 'Feb 2026', status: 'In Progress' }
  ];
}
