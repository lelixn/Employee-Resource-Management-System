import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrls: ['./overview.css']
})
export class OverviewPage implements AfterViewInit, OnInit {
  employees: any;
  departments: unknown[] | undefined;
  averageSalary: number | undefined;
  recentEmployees: any;


  systemStatus: string = 'Online';
  lastBackup: Date = new Date();
  pendingApprovals: number = 0;
  internalMessages: number = 0;
  ngOnInit(): void {

    setInterval(() => {
      this.systemStatus = Math.random() > 0.05 ? 'Online' : 'Offline';
      this.lastBackup = new Date(Date.now() - Math.random() * 3600000);
      this.pendingApprovals = Math.floor(Math.random() * 5);
      this.internalMessages = Math.floor(Math.random() * 10);
    }, 5000);

    this.loadData();
    window.addEventListener('storage', () => this.loadData());
  }

  






  loadData() {
    const employeesData = localStorage.getItem('employees');
    if (employeesData) {
      this.employees = JSON.parse(employeesData);
      this.departments = [...new Set(this.employees.map((e: any) => e.department))];

      
      const validSalaries = this.employees
        .map((e: any) => Number(e.salary))
        .filter((s: number) => !isNaN(s));

      this.averageSalary =
        validSalaries.length > 0
          ? Math.round(validSalaries.reduce((a: any, b: any) => a + b, 0) / validSalaries.length)
          : 0;

      // Show recent 3 employees
      this.recentEmployees = this.employees.slice(-3).reverse();
    }
  }


  ngAfterViewInit() {
    // Animate the cards one by one
    gsap.from('.overview-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Animate recent employees and system overview sections
    gsap.from('.overview-section', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }
}

















// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-overview',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './overview.html',
//   styleUrls: ['./overview.css']
// })
// export class OverviewPage {}




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { EmployeeService } from '../../../services/employee';
// import { Employee } from '../../../models/employee.model';

// @Component({
//   selector: 'app-overview-page',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="overview">
//       <h2>Welcome Back 👋</h2>
//       <p>Here’s a quick look at your organization’s status.</p>

//       <div class="overview-cards">
//         <div class="card">
//           <h3>👥 Employees</h3>
//           <p>{{ totalEmployees }}</p>
//         </div>

//         <div class="card">
//           <h3>💼 Departments</h3>
//           <p>{{ totalDepartments }}</p>
//         </div>

//         <div class="card">
//           <h3>💰 Avg Salary</h3>
//           <p>₹{{ avgSalary | number:'1.0-0' }}</p>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .overview {
//       padding: 2rem;
//       color: white;
//       text-align: center;
//       animation: fadeIn 0.5s ease;
//     }

//     h2 {
//       font-size: 2rem;
//       color: #7dd3fc;
//       margin-bottom: 0.5rem;
//     }

//     p {
//       color: #a3a3a3;
//       margin-bottom: 2rem;
//     }

//     .overview-cards {
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 1.5rem;
//     }

//     .card {
//       background: rgba(255, 255, 255, 0.05);
//       border: 1px solid rgba(255, 255, 255, 0.1);
//       backdrop-filter: blur(10px);
//       border-radius: 20px;
//       padding: 1.5rem 2rem;
//       min-width: 200px;
//       transition: all 0.3s ease;
//       box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//     }

//     .card:hover {
//       transform: translateY(-5px);
//       box-shadow: 0 20px 50px rgba(0, 204, 255, 0.15);
//     }

//     .card h3 {
//       font-weight: 600;
//       color: #93c5fd;
//       margin-bottom: 0.3rem;
//     }

//     .card p {
//       font-size: 1.4rem;
//       font-weight: 700;
//       color: #f3f4f6;
//     }

//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(10px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//   `]
// })
// export class OverviewPage implements OnInit {
//   employees: Employee[] = [];
//   totalEmployees = 0;
//   totalDepartments = 0;
//   avgSalary = 0;

//   constructor(private service: EmployeeService) {}

//   ngOnInit(): void {
//     this.service.getAll().subscribe((list: Employee[]) => {
//       this.employees = list;
//       this.calculateStats();
//     });
//   }

//   calculateStats() {
//     this.totalEmployees = this.employees.length;
//     const departments = new Set(this.employees.map(emp => emp.department));
//     this.totalDepartments = departments.size;
//     const totalSalary = this.employees.reduce((sum, emp) => sum + emp.salary, 0);
//     this.avgSalary = this.employees.length ? totalSalary / this.employees.length : 0;
//   }
// }
