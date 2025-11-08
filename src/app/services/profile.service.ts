import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private hrProfileSource = new BehaviorSubject<any>({
    name: 'Lelien Panda',
    role: 'HR Manager',
    email: 'lelinpanda35@gmail.com',
    image: 'assets/hr-default.png'
  });

  hrProfile$ = this.hrProfileSource.asObservable();

  constructor() {
    const stored = localStorage.getItem('loggedInUser');
    if (stored) {
      this.hrProfileSource.next(JSON.parse(stored));
    }

   
    window.addEventListener('storage', () => {
      const updated = localStorage.getItem('loggedInUser');
      if (updated) {
        this.hrProfileSource.next(JSON.parse(updated));
      }
    });
  }

  updateHRProfile(profile: any) {
    this.hrProfileSource.next(profile);
    localStorage.setItem('loggedInUser', JSON.stringify(profile));
  }
}
