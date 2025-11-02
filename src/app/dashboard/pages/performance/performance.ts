import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.html',
  styleUrls: ['./performance.css']
})
export class PerformanceComponent {
  performanceData = [
    { name: 'Aisha Khan', score: 92, rating: 'Excellent' },
    { name: 'Ravi Patel', score: 85, rating: 'Good' },
    { name: 'Meera Sen', score: 78, rating: 'Average' }
  ];
}
