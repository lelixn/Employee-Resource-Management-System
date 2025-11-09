import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee';
import { ProfileService } from '../services/profile.service';
import gsap from 'gsap';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {


  goToLanding() {
    this.router.navigate(['/landing']);
  }

  adding: boolean | undefined;
  editing: boolean | undefined;

  startAdd() {
    this.adding = true;
    this.editing = false;
    this.selectedEmployee = {
      id: 0,
      name: '',
      email: '',
      department: '',
      salary: 0,
      image: ''
    };
  }




  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('topbar') topbar!: ElementRef;
  @ViewChild('content') content!: ElementRef;

  hrProfileOpen = false;
  employeesArr: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  searchQuery = '';
  refreshing = false;
  toastMessage = '';
  showingToast = false;
  confirmingDelete = false;



  constructor(private router: Router, private profileService: ProfileService) { }

  hrProfile: any = {};

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role !== 'HR') {
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Load HR profile from logged-in user first
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.hrProfile = {
        name: user.name || 'HR Manager',
        email: user.email || 'hr@erms.com',
        image: user.image || 'assets/hr-default.png',
        role: 'HR' // Always set role to HR for HR dashboard
      };
    } else {
      // Fallback to saved profile or default
      const savedProfile = localStorage.getItem('hrProfile');
      this.hrProfile = savedProfile ? JSON.parse(savedProfile) : {
        name: 'HR Manager',
        email: 'hr@erms.com',
        image: 'assets/hr-default.png',
        role: 'HR'
      };
      // Ensure role is HR
      this.hrProfile.role = 'HR';
    }

    // ✅ Save to hrProfile for consistency
    localStorage.setItem('hrProfile', JSON.stringify(this.hrProfile));

    // ✅ Listen for HR profile updates dynamically
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'hrProfile' || event.key === 'profileUpdateEvent' || event.key === 'loggedInUser') {
        const updatedUser = localStorage.getItem('loggedInUser');
        if (updatedUser) {
          const user = JSON.parse(updatedUser);
          this.hrProfile = {
            ...user,
            role: 'HR' // Always ensure role is HR
          };
          localStorage.setItem('hrProfile', JSON.stringify(this.hrProfile));
        } else {
          const updatedProfile = localStorage.getItem('hrProfile');
          if (updatedProfile) {
            this.hrProfile = { ...JSON.parse(updatedProfile), role: 'HR' };
          }
        }
      }
    });

    this.refresh();

    this.profileService.hrProfile$.subscribe((profile) => {
      this.hrProfile = { ...profile, role: 'HR' };
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.className = savedTheme;
    }

    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'themeChangeEvent') {
        const theme = localStorage.getItem('theme');
        if (theme) {
          document.body.className = theme;
        }
      }
    });
  }
  refresh() {
    this.refreshing = true;
    
    setTimeout(() => {
      this.refreshing = false;
    }, 800);
  }

  ngAfterViewInit(): void {
    // 🌀 Animate sidebar, topbar, and content
    gsap.from('.sidebar', { x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.topbar', { y: -50, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
    gsap.from('.content', { opacity: 0, y: 30, duration: 1, delay: 0.6, ease: 'power3.out' });
  }

    // refresh(): void {
    //   this.refreshing = true;
    //   this.svc.getAll().subscribe({
    //     next: (list: Employee[]) => {
    //       this.employeesArr = list;
    //       this.filteredEmployees = list;
    //       this.refreshing = false;
    //     },
    //     error: () => {
    //       this.showToast('⚠️ Failed to fetch employees');
    //       this.refreshing = false;
    //     }
  //   });
  // }

    filterEmployees(): void {
      const q = this.searchQuery.toLowerCase().trim();
      if(!q) {
        this.filteredEmployees = [...this.employeesArr];
        return;
      }
    this.filteredEmployees = this.employeesArr.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q)
    );
  }

    showToast(message: string): void {
  this.toastMessage = message;
  this.showingToast = true;
  setTimeout(() => (this.showingToast = false), 2500);
}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // 🌀 Modal Animation
  openProfile(): void {
    this.hrProfileOpen = true;
    setTimeout(() => {
      gsap.from('.modal-card', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });
    });
  }

  assignEmployee(employeeEmail: string) {
    const assignment = {
      projects: ['Inventory System', 'Bug Tracker'],
      attendance: 92,
      tasks: ['Fix navbar', 'Deploy frontend']
    };
    localStorage.setItem(`assigned_${employeeEmail}`, JSON.stringify(assignment));
  }


  closeProfile(): void {
    gsap.to('.modal-card', {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => { this.hrProfileOpen = false; }
    });
  }
}


