import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeSyncService {

  constructor() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.body.className = theme;
  }

  setTheme(theme: string) {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }

  getTheme() {
    return localStorage.getItem('theme') || 'dark';
  }
}
