import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  hrProfile = {
    name: 'Lelien Panda',
    role: 'HR Manager',
    email: 'lelinpanda35@gmail.com',
    image: 'assets/hr-default.png' // you can replace this with your uploaded image path
  };

  updateProfileImage(newImage: string) {
    this.hrProfile.image = newImage;
    localStorage.setItem('hrProfileImage', newImage);
  }

  loadProfile() {
    const savedImage = localStorage.getItem('hrProfileImage');
    if (savedImage) {
      this.hrProfile.image = savedImage;
    }
  }
}
