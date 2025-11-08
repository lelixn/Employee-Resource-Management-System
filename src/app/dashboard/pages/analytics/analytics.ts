import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import gsap from 'gsap';


Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class AnalyticsComponent implements AfterViewInit, OnInit {
  employees: any[] = [];
  departments: string[] = [];
  avgSalary: number = 0;

deptChartData: Chart | null = null;

salaryChartData: Chart | null = null;
  deptChart: any;
  salaryChart: any;
chartOptions: any;

  ngOnInit(): void {
    this.loadData();

    // Real-time updates whenever data changes (from Employees CRUD)
    window.addEventListener('storage', () => this.loadData());
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderCharts();
      this.animateCards();
    }, 400);
  }


  loadData() {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      this.employees = JSON.parse(storedEmployees);

      // Departments list
      this.departments = [...new Set(this.employees.map((e: any) => e.department))];

      // Average salary calculation
      const salaries = this.employees
        .map((e: any) => Number(e.salary))
        .filter((s) => !isNaN(s));
      this.avgSalary = salaries.length
        ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
        : 0;
    }
  }


  refreshData() {
    this.loadData();
    this.destroyCharts();
    this.renderCharts();
  }

  // 🔹 Destroy old charts to prevent memory leak
  destroyCharts() {
    if (this.deptChart) {
      this.deptChart.destroy();
      this.deptChart = null;
    }
    if (this.salaryChart) {
      this.salaryChart.destroy();
      this.salaryChart = null;
    }
  }

 
  renderCharts() {
    if (!this.departments.length || !this.employees.length) {
      console.warn('No data to display in charts.');
      return;
    }

    // Employees per department
    const deptCounts = this.departments.map(
      (dept) => this.employees.filter((e) => e.department === dept).length
    );

    const deptCtx = document.getElementById('deptChart') as HTMLCanvasElement;
    const salaryCtx = document.getElementById('salaryChart') as HTMLCanvasElement;

    if (!deptCtx || !salaryCtx) {
      console.error('Chart canvas not found in DOM.');
      return;
    }

    this.deptChart = new Chart(deptCtx, {
      type: 'bar',
      data: {
        labels: this.departments.length ? this.departments : ['No Data'],
        datasets: [{
          label: 'Employee Count',
          data: deptCounts.length ? deptCounts : [0],
          backgroundColor: 'rgba(16, 185, 129, 0.6)',
          borderColor: '#10b981',
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#93c5fd' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          },
          x: {
            ticks: { color: '#93c5fd' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        },
        plugins: {
          legend: { labels: { color: '#e2e8f0' } }
        }
      }
    });

    // Salary distribution
    const ranges = {
      '<40k': this.employees.filter((e) => e.salary < 40000).length,
      '40k-60k': this.employees.filter((e) => e.salary >= 40000 && e.salary < 60000).length,
      '60k-80k': this.employees.filter((e) => e.salary >= 60000 && e.salary < 80000).length,
      '>80k': this.employees.filter((e) => e.salary >= 80000).length
    };

    new Chart('salaryChart', {
      type: 'doughnut',
      data: {
        labels: Object.keys(ranges),
        datasets: [{
          label: 'Salary Distribution',
          data: Object.values(ranges),
          backgroundColor: ['#ec4899', '#3b82f6', '#facc15', '#2dd4bf'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#e2e8f0' } }
        }
      }
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
