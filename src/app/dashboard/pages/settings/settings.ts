import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit {
  selectedImage: string | ArrayBuffer | null | undefined;
  ngOnInit() {
    this.profileService.loadProfile();
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.profileService.updateProfileImage(this.selectedImage as string);
      };
      reader.readAsDataURL(file);
    }
  }

profileService: any;
onFileChange($event: Event) {
const target = $event.target as HTMLInputElement;
const file = target.files?.[0];
if (file) {
  const reader = new FileReader();
  reader.onload = () => {
    this.profileService.updateProfileImage(reader.result as string);
  };
  reader.readAsDataURL(file);
}
}
saveSettings() {

}
changeTheme($event: Event) {
const target = $event.target as HTMLSelectElement;
const theme = target.value;
document.documentElement.setAttribute('data-theme', theme);

}
}
