import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeSyncService } from '../../../services/theme-sync.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit {
  user: any = {};
  previewImage: string | ArrayBuffer | null = '';
  selectedTheme = 'dark';

  constructor(private theme: ThemeSyncService, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getLoggedInUser() || {
      name: 'HR Manager',
      email: 'hr@erms.com',
      password: ''
    };
    this.previewImage = this.user?.image || 'assets/default-avatar.png';
    this.selectedTheme = this.theme.getTheme();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
        this.user.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  changePhoto(event: any) {
    this.onFileSelected(event);
  }

  updateProfile() {
    if (!this.user.name || !this.user.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    
    // Also update HR profile if it exists
    const hrProfile = localStorage.getItem('hrProfile');
    if (hrProfile) {
      const profile = JSON.parse(hrProfile);
      profile.name = this.user.name;
      profile.email = this.user.email;
      profile.image = this.user.image || profile.image;
      localStorage.setItem('hrProfile', JSON.stringify(profile));
    }
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
    localStorage.setItem('profileUpdateEvent', Date.now().toString());
    
    alert('✅ Profile updated successfully!');
  }

  resetDefaults() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      this.user = {
        name: 'HR Manager',
        email: 'hr@erms.com',
        password: '',
        image: 'assets/default-avatar.png'
      };
      this.previewImage = 'assets/default-avatar.png';
      this.selectedTheme = 'dark';
      this.theme.setTheme('dark');
      localStorage.setItem('loggedInUser', JSON.stringify(this.user));
      alert('✅ Settings reset to defaults');
    }
  }

  changeTheme(theme: string) {
    this.selectedTheme = theme;
    this.theme.setTheme(theme);
    localStorage.setItem('themeChangeEvent', Date.now().toString());
  }

  saveTheme(theme: string) {
    this.changeTheme(theme);
  }
}
