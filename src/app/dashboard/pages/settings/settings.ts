import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit, AfterViewInit {

  user: any = { name: '', email: '', password: '', image: '', role: '' };
  selectedTheme: string = 'dark';
  previewImage: string | ArrayBuffer | null = '';
  hrProfile: any;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    // ✅ 1. Load HR or logged-in user
    const hrData = JSON.parse(localStorage.getItem('hrProfile') || '{}');
    const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.hrProfile = hrData.name ? hrData : loggedUser;
    this.user = { ...this.hrProfile };

    // ✅ 2. Load default avatar
    this.previewImage = this.user.image || 'assets/default-avatar.png';

    // ✅ 3. Apply saved theme or fallback to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.selectedTheme = savedTheme;
    document.body.className = savedTheme;

    // ✅ 4. Animate UI on load
    // gsap.from('.settings-card', { opacity: 0, y: 20, duration: 0.8 });
  }

  // ✅ Upload Profile Image
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
        this.user.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ Save Profile Changes
  updateProfile() {
    // Save to localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    localStorage.setItem('hrProfile', JSON.stringify(this.user));

    // Update via ProfileService (for live HR sync)
    if (this.profileService && typeof this.profileService.updateHRProfile === 'function') {
      this.profileService.updateHRProfile(this.user);
    }

    // Update employees list if exists
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const index = employees.findIndex((e: any) => e.email === this.user.email);
    if (index !== -1) {
      employees[index] = this.user;
      localStorage.setItem('employees', JSON.stringify(employees));
    }

    // Trigger storage event so dashboard updates immediately
    window.dispatchEvent(new StorageEvent('storage', { key: 'hrProfile' }));

    alert('✅ Profile updated successfully!');

    // If HR, reload dashboard
    if (this.user.role === 'HR') {
      this.router.navigate(['/dashboard/overview']);
    }
  }

  // ✅ Change Theme Dynamically
  changeTheme(theme: string) {
    this.selectedTheme = theme;
    document.body.className = theme;
    localStorage.setItem('theme', theme);

    // Broadcast theme change
    localStorage.setItem('themeChangeEvent', `${Date.now()}`);
    window.dispatchEvent(new StorageEvent('storage', { key: 'themeChangeEvent' }));
  }

  // ✅ Reset Defaults (without deleting HR info)
  resetDefaults() {
    const currentRole = this.user.role || 'HR';
    const currentEmail = this.user.email;

    this.user = {
      name: '',
      email: currentEmail,
      password: '',
      image: 'assets/default-avatar.png',
      role: currentRole
    };
    this.previewImage = 'assets/default-avatar.png';

    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    localStorage.setItem('hrProfile', JSON.stringify(this.user));

    alert('⚙ Settings reset to default!');
  }

  ngAfterViewInit(): void {
    gsap.from('.settings-card', { opacity: 0, y: 20, duration: 0.8 });
  }
}
