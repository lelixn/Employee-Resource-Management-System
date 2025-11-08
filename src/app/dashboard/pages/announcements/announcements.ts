import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './announcements.html',
  styleUrls: ['./announcements.css']
})
export class AnnouncementsComponent implements OnInit, AfterViewInit {

  announcements: any[] = [];
  newAnnouncement = { title: '', message: '', date: '' };
  isHR: boolean = false;

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isHR = role === 'HR';

    const stored = localStorage.getItem('announcements');
    this.announcements = stored ? JSON.parse(stored) : [];
  }

  ngAfterViewInit(): void {
    gsap.from('.announcement-card', { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 });
  }

  addAnnouncement(): void {
    if (!this.newAnnouncement.title.trim() || !this.newAnnouncement.message.trim()) return;

    this.newAnnouncement.date = new Date().toLocaleString();
    this.announcements.unshift({ ...this.newAnnouncement }); // latest on top
    localStorage.setItem('announcements', JSON.stringify(this.announcements));

    this.newAnnouncement = { title: '', message: '', date: '' };
    this.animateNewAnnouncement();
  }

  deleteAnnouncement(index: number): void {
    this.announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(this.announcements));
  }

  private animateNewAnnouncement(): void {
    gsap.from('.announcement-card:first-child', {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });
  }
}
