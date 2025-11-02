import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class App implements OnInit {

  constructor(private router: Router) {
    console.log('✅ App component initialized');
  }

  ngOnInit() {
    const role = localStorage.getItem('role');
    console.log('User role detected:', role);

    // Redirect based on role
    if (role === 'HR') {
      this.router.navigate(['/dashboard']);
    } else if (role === 'EMPLOYEE') {
      this.router.navigate(['/employee-dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
