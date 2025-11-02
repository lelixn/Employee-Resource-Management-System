import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./landing.css'],
  templateUrl: './landing.html'
})
export class LandingPage implements AfterViewInit {
  @ViewChild('gsapBg', { static: true }) gsapBg!: ElementRef<HTMLElement>;

  
  year = new Date().getFullYear();
  isScrolled = false;

  constructor(private router: Router) {}
  async ngAfterViewInit(): Promise<void> {
    const { gsap } = await import('gsap');

    const container = this.gsapBg.nativeElement;
    // query node list and convert to array
    const blobs = Array.from(container.querySelectorAll<HTMLElement>('.blob'));

    // subtle random initial position offset
    blobs.forEach((b, i) => {
      const rx = (Math.random() - 0.5) * 40; // px
      const ry = (Math.random() - 0.5) * 40;
      gsap.set(b, { x: rx, y: ry, scale: 0.9 + Math.random() * 0.4, rotate: (Math.random() - 0.5) * 20 });
    });

    // floating animation: each blob gets its own duration & offset for organic feel
    blobs.forEach((b, i) => {
      const dur = 6 + Math.random() * 6;
      gsap.to(b, {
        x: `+=${(Math.random() - 0.5) * 60}`,
        y: `+=${(Math.random() - 0.5) * 80}`,
        rotate: `+=${(Math.random() - 0.5) * 40}`,
        duration: dur,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
      });
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  login() {
    this.router.navigate(['/login']);
  }
  register() {
    this.router.navigate(['/register']);
  }
}
