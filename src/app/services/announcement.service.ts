import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private announcementsSubject = new BehaviorSubject<Announcement[]>([]);
  public announcements$ = this.announcementsSubject.asObservable();

  constructor() {
    this.loadAnnouncements();
  }

  private loadAnnouncements(): void {
    const stored = localStorage.getItem('announcements');
    if (stored) {
      this.announcementsSubject.next(JSON.parse(stored));
    } else {
      // Default announcements for demo
      const defaultAnnouncements: Announcement[] = [
        {
          id: 1,
          title: 'Welcome to ERMS',
          content: 'Welcome to the Employee Resource Management System!',
          date: new Date().toISOString(),
          priority: 'high'
        },
        {
          id: 2,
          title: 'System Update',
          content: 'New features have been added to the dashboard.',
          date: new Date().toISOString(),
          priority: 'medium'
        }
      ];
      this.announcementsSubject.next(defaultAnnouncements);
      this.saveAnnouncements(defaultAnnouncements);
    }
  }

  private saveAnnouncements(announcements: Announcement[]): void {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }

  // ✅ Get all announcements
  getAll(): Observable<Announcement[]> {
    return this.announcements$;
  }

  // ✅ Add new announcement
  addAnnouncement(data: Omit<Announcement, 'id'>): Observable<Announcement> {
    return new Observable(observer => {
      const current = this.announcementsSubject.value;
      const newAnnouncement: Announcement = {
        ...data,
        id: Date.now()
      };
      const updated = [...current, newAnnouncement];
      this.announcementsSubject.next(updated);
      this.saveAnnouncements(updated);
      observer.next(newAnnouncement);
      observer.complete();
    });
  }

  // ✅ Delete an announcement
  deleteAnnouncement(id: number): Observable<any> {
    return new Observable(observer => {
      const current = this.announcementsSubject.value;
      const updated = current.filter(a => a.id !== id);
      this.announcementsSubject.next(updated);
      this.saveAnnouncements(updated);
      observer.next({ success: true });
      observer.complete();
    });
  }
}
