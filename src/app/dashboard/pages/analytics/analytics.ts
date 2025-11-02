import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import gsap from 'gsap';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class AnalyticsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.renderCharts();
    this.animateCards();
  }

  renderCharts() {
    new Chart('deptChart', {
      type: 'bar',
      data: {
        labels: ['Engineering', 'Finance', 'HR', 'Sales', 'Marketing'],
        datasets: [{
          label: 'Employee Count',
          data: [12, 6, 8, 10, 5],
          backgroundColor: 'rgba(0, 255, 180, 0.4)',
          borderColor: '#00ffcc',
          borderWidth: 1
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    new Chart('salaryChart', {
      type: 'doughnut',
      data: {
        labels: ['< 40k', '40k - 60k', '60k - 80k', '> 80k'],
        datasets: [{
          label: 'Salary Distribution',
          data: [5, 8, 4, 3],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
        }]
      },
      options: { responsive: true }
    });
  }

  animateCards() {
    gsap.from('.stat-card', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }
}
