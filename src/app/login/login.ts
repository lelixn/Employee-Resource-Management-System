import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPage {
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.message = this.auth.login(this.email.trim(), this.password.trim());
  }

  ngOnInit() {
    
    setTimeout(() => {
      this.email = '';
      this.password = '';
    }, 50);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
