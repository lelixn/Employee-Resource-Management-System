import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-canvas-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './canvas-notes.html',
  styleUrls: ['./canvas-notes.css']
})
export class CanvasNotesComponent {
  showCanvas = false;
  notes = '';

  toggleCanvas() {
    this.showCanvas = !this.showCanvas;
  }

  clearNotes() {
    this.notes = '';
  }
  
}
