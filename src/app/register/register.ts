import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.message = this.auth.register({
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
      role: 'EMPLOYEE'
    });

    if (this.message.startsWith('✅')) {
      setTimeout(() => this.router.navigate(['/login']), 1000);
    }
  }

  

  ngOnInit() {
  // Clear input autofill ghost values
  setTimeout(() => {
    this.name = '';
    this.email = '';
    this.password = '';
  }, 50);
}


  goToLogin() {
    this.router.navigate(['/login']);
  }
}
