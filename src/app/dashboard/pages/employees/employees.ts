import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  selectedEmployee: any = null;
  showForm = false;
  editingEmployee: any = null;
  showAssignModal = false;
  showModal = false;
  
  newEmployee: any = {
    name: '',
    email: '',
    department: '',
    salary: 0,
    image: ''
  };

  newProject: any = {
    name: '',
    employee: '',
    deadline: '',
    status: 'In Progress'
  };

  constructor(private empService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getAllEmployees().subscribe({
      next: (data: any[]) => {
        this.employees = data;
        // Load assignment data from localStorage
        this.employees = this.employees.map(emp => {
          const assignment = localStorage.getItem(`assigned_${emp.email}`);
          if (assignment) {
            const assigned = JSON.parse(assignment);
            return {
              ...emp,
              project: assigned.projects?.[0] || emp.project,
              task: assigned.tasks?.join(', ') || emp.task,
              attendance: assigned.attendance || emp.attendance
            };
          }
          return emp;
        });
      },
      error: (err: any) => {
        console.error('Error loading employees', err);
        // Fallback: load from localStorage if API fails
        const stored = localStorage.getItem('employees');
        if (stored) {
          this.employees = JSON.parse(stored);
        }
      }
    });
  }

  openAddForm() {
    this.editingEmployee = null;
    this.newEmployee = {
      name: '',
      email: '',
      department: '',
      salary: 0,
      image: 'https://randomuser.me/api/portraits/lego/1.jpg'
    };
    this.showForm = true;
  }

  editEmployee(emp: any) {
    this.editingEmployee = emp;
    this.newEmployee = { ...emp };
    this.showForm = true;
  }

  addOrUpdateEmployee() {
    if (!this.newEmployee.name || !this.newEmployee.email || !this.newEmployee.department) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.editingEmployee) {
      // Update existing employee
      this.empService.addEmployee(this.newEmployee).subscribe({
        next: () => {
          alert('✅ Employee updated successfully!');
          this.showForm = false;
          this.loadEmployees();
        },
        error: (err: any) => {
          console.error('Update failed', err);
          // Fallback: update in localStorage
          const stored = localStorage.getItem('employees');
          if (stored) {
            const employees = JSON.parse(stored);
            const index = employees.findIndex((e: any) => e.email === this.editingEmployee.email);
            if (index !== -1) {
              employees[index] = { ...this.newEmployee, id: employees[index].id };
              localStorage.setItem('employees', JSON.stringify(employees));
              this.employees = employees;
            }
          }
          alert('✅ Employee updated (saved locally)!');
          this.showForm = false;
        }
      });
    } else {
      // Add new employee
      const employeeToAdd = {
        ...this.newEmployee,
        id: Date.now()
      };
      
      this.empService.addEmployee(employeeToAdd).subscribe({
        next: () => {
          alert('✅ Employee added successfully!');
          this.showForm = false;
          this.loadEmployees();
        },
        error: (err: any) => {
          console.error('Add failed', err);
          // Fallback: save to localStorage
          const stored = localStorage.getItem('employees');
          const employees = stored ? JSON.parse(stored) : [];
          employees.push(employeeToAdd);
          localStorage.setItem('employees', JSON.stringify(employees));
          this.employees = employees;
          alert('✅ Employee added (saved locally)!');
          this.showForm = false;
        }
      });
    }
  }

  deleteEmployee(email: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      const emp = this.employees.find(e => e.email === email);
      if (emp && emp.id) {
        this.empService.deleteEmployee(emp.id).subscribe({
          next: () => {
            alert('✅ Employee deleted successfully!');
            this.loadEmployees();
          },
          error: (err: any) => {
            console.error('Delete failed', err);
            // Fallback: delete from localStorage
            const stored = localStorage.getItem('employees');
            if (stored) {
              const employees = JSON.parse(stored);
              const filtered = employees.filter((e: any) => e.email !== email);
              localStorage.setItem('employees', JSON.stringify(filtered));
              this.employees = filtered;
            }
            alert('✅ Employee deleted (removed locally)!');
          }
        });
      }
    }
  }

  validateSalary(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (value < 0) {
      input.value = '0';
      this.newEmployee.salary = 0;
    }
  }

  openAssignModal() {
    this.newProject = {
      name: '',
      employee: '',
      deadline: '',
      status: 'In Progress'
    };
    this.showAssignModal = true;
  }

  closeAssignModal() {
    this.showAssignModal = false;
  }

  assignProject(event: Event) {
    event.preventDefault();
    
    if (!this.newProject.name || !this.newProject.employee) {
      alert('Please fill in project name and employee name');
      return;
    }

    const emp = this.employees.find(e => 
      e.name.toLowerCase().includes(this.newProject.employee.toLowerCase()) ||
      e.email.toLowerCase().includes(this.newProject.employee.toLowerCase())
    );

    if (!emp) {
      alert('Employee not found!');
      return;
    }

    const assignment = {
      projects: [this.newProject.name],
      attendance: Math.floor(Math.random() * 20) + 80, // Random 80-100
      tasks: [`Work on ${this.newProject.name}`, 'Review code', 'Update documentation'],
      deadline: this.newProject.deadline,
      status: this.newProject.status
    };

    // Save to localStorage
    localStorage.setItem(`assigned_${emp.email}`, JSON.stringify(assignment));
    
    // Also try to save via API
    this.empService.assignTask(emp.id || emp.email, assignment).subscribe({
      next: () => {
        alert('✅ Project assigned successfully!');
        this.showAssignModal = false;
        this.loadEmployees();
      },
      error: (err: any) => {
        console.error('Assignment failed', err);
        alert('✅ Project assigned (saved locally)!');
        this.showAssignModal = false;
        this.loadEmployees();
      }
    });
  }

  // ✅ Assign Project / Attendance / Tasks (legacy method)
  assignTask(emp: any, project: string, attendance: number, tasks: string[]) {
    const payload = { assignedProject: project, attendance, tasks };
    this.empService.assignTask(emp.id, payload).subscribe({
      next: () => alert('✅ Assigned successfully!'),
      error: (err: any) => {
        console.error('Assignment failed', err);
        // Fallback to localStorage
        const assignment = { projects: [project], attendance, tasks };
        localStorage.setItem(`assigned_${emp.email}`, JSON.stringify(assignment));
        alert('✅ Assigned (saved locally)!');
        this.loadEmployees();
      }
    });
  }
}
