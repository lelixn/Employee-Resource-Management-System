import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-settings.html',
  styleUrls: ['./profile-settings.css']
})
export class ProfileSettingsComponent implements OnInit {
  user: any = {};
  defaultImage = '?img=3';

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('loggedInUser');
    if (data) {
      this.user = JSON.parse(data);
    } else {
      this.router.navigate(['/login']);
    }

    gsap.from('.settings-container', { y: 50, opacity: 0, duration: 1 });
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    this.router.navigate(['/employee-dashboard']);
  }

  goBack() {
    this.router.navigate(['/employee-dashboard']);
  }
}
