import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PerformanceService } from './services/performance.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  template: `<router-outlet></router-outlet>`
})
export class App implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
