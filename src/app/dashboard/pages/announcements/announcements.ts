import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcements.html',
  styleUrls: ['./announcements.css']
})
export class AnnouncementsComponent {
  announcements = [
    { title: '🎉 Team Outing', message: 'Company outing scheduled for next Friday.', date: 'Nov 10, 2025' },
    { title: '🧾 Salary Update', message: 'New salary structure effective from December.', date: 'Nov 20, 2025' },
    { title: '📢 Policy Change', message: 'New hybrid work policy will start next month.', date: 'Dec 1, 2025' }
  ];
}
