import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  employee: any = {
    name: '',
    email: '',
    department: '',
    salary: 0,
    image: '',
    role: 'EMPLOYEE'
  };

  editing = false;

  ngOnInit(): void {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.employee = JSON.parse(user);
    }
  }

  enableEdit() {
    this.editing = true;
  }

  saveProfile() {
    localStorage.setItem('loggedInUser', JSON.stringify(this.employee));
    this.editing = false;
    alert('✅ Profile updated successfully!');

    // Also update the stored employee list
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const idx = employees.findIndex((e: any) => e.email === this.employee.email);
    if (idx !== -1) {
      employees[idx] = this.employee;
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }

  cancelEdit() {
    this.editing = false;
    const user = localStorage.getItem('loggedInUser');
    if (user) this.employee = JSON.parse(user);
  }
}






















// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './profile.html',
//   styleUrls: ['./profile.css']
// })
// export class ProfileComponent implements OnInit {
//   employee: any = {
//     name: '',
//     email: '',
//     department: '',
//     salary: 0,
//     image: ''
//   };
//   editing = false;

//   ngOnInit(): void {
//     const user = localStorage.getItem('loggedInUser');
//     if (user) {
//       this.employee = JSON.parse(user);
//     }
//   }

//   enableEdit() {
//     this.editing = true;
//   }

//   saveProfile() {
//     localStorage.setItem('loggedInUser', JSON.stringify(this.employee));
//     this.editing = false;
//     alert('✅ Profile updated successfully!');
//   }

//   cancelEdit() {
//     this.editing = false;
//     const user = localStorage.getItem('loggedInUser');
//     if (user) this.employee = JSON.parse(user);
//   }
// }
