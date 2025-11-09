import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnnouncementService } from '../../../services/announcement.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './announcements.html',
  styleUrls: ['./announcements.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements: any[] = [];
  newAnnouncement = { title: '', message: '' };
  isHR = false;

  constructor(private annService: AnnouncementService, private auth: AuthService) {}

  ngOnInit() {
    this.isHR = localStorage.getItem('role') === 'HR';
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.annService.getAll().subscribe({
      next: (data: any[]) => {
        this.announcements = data.map(ann => ({
          ...ann,
          message: ann.content || ann.message,
          date: ann.date ? new Date(ann.date).toLocaleDateString() : 'N/A'
        }));
      },
      error: (err: any) => {
        console.error('Error loading announcements', err);
        // Fallback: load from localStorage
        const stored = localStorage.getItem('announcements');
        if (stored) {
          this.announcements = JSON.parse(stored);
        }
      }
    });
  }

  addAnnouncement() {
    this.postAnnouncement();
  }

  postAnnouncement() {
    if (!this.newAnnouncement.title || !this.newAnnouncement.message) {
      alert('Please fill in both title and message');
      return;
    }
    
    const newAnn = {
      title: this.newAnnouncement.title,
      content: this.newAnnouncement.message,
      date: new Date().toISOString(),
      priority: 'medium' as 'medium'
    };
    
    this.annService.addAnnouncement(newAnn).subscribe({
      next: () => {
        alert('✅ Announcement posted successfully!');
        this.newAnnouncement = { title: '', message: '' };
        this.loadAnnouncements();
      },
      error: (err: any) => {
        console.error('Post failed', err);
        // Fallback: save to localStorage
        const stored = localStorage.getItem('announcements');
        const announcements = stored ? JSON.parse(stored) : [];
        announcements.push({
          ...newAnn,
          id: Date.now(),
          message: newAnn.content
        });
        localStorage.setItem('announcements', JSON.stringify(announcements));
        this.announcements = announcements;
        alert('✅ Announcement posted (saved locally)!');
        this.newAnnouncement = { title: '', message: '' };
      }
    });
  }

  deleteAnnouncement(index: number) {
    const ann = this.announcements[index];
    if (!ann) return;
    
    if (confirm('Delete this announcement?')) {
      if (ann.id) {
        this.annService.deleteAnnouncement(ann.id).subscribe({
          next: () => {
            alert('✅ Announcement deleted!');
            this.loadAnnouncements();
          },
          error: (err: any) => {
            console.error('Delete failed', err);
            // Fallback: delete from localStorage
            const stored = localStorage.getItem('announcements');
            if (stored) {
              const announcements = JSON.parse(stored);
              const filtered = announcements.filter((a: any) => a.id !== ann.id);
              localStorage.setItem('announcements', JSON.stringify(filtered));
              this.announcements = filtered;
            }
            alert('✅ Announcement deleted (removed locally)!');
          }
        });
      } else {
        // Remove from local array if no ID
        this.announcements.splice(index, 1);
        localStorage.setItem('announcements', JSON.stringify(this.announcements));
        alert('✅ Announcement deleted!');
      }
    }
  }
}

