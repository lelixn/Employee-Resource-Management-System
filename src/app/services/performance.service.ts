import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PerformanceMetric {
  id: number;
  employeeId: number;
  metricName: string;
  value: number;
  target: number;
  period: string;
  category: 'productivity' | 'quality' | 'attendance' | 'teamwork';
}

export interface PerformanceReview {
  id: number;
  employeeId: number;
  reviewerName: string;
  rating: number;
  comments: string;
  date: string;
  goals: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private metricsSubject = new BehaviorSubject<PerformanceMetric[]>([]);
  private reviewsSubject = new BehaviorSubject<PerformanceReview[]>([]);
  public metrics$ = this.metricsSubject.asObservable();
  public reviews$ = this.reviewsSubject.asObservable();

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    const storedMetrics = localStorage.getItem('performanceMetrics');
    const storedReviews = localStorage.getItem('performanceReviews');

    if (storedMetrics) {
      this.metricsSubject.next(JSON.parse(storedMetrics));
    } else {
      const defaultMetrics: PerformanceMetric[] = [
        {
          id: 1,
          employeeId: 1,
          metricName: 'Task Completion Rate',
          value: 85,
          target: 90,
          period: 'Q1 2024',
          category: 'productivity'
        },
        {
          id: 2,
          employeeId: 1,
          metricName: 'Code Quality Score',
          value: 92,
          target: 85,
          period: 'Q1 2024',
          category: 'quality'
        }
      ];
      this.metricsSubject.next(defaultMetrics);
      localStorage.setItem('performanceMetrics', JSON.stringify(defaultMetrics));
    }

    if (storedReviews) {
      this.reviewsSubject.next(JSON.parse(storedReviews));
    } else {
      const defaultReviews: PerformanceReview[] = [
        {
          id: 1,
          employeeId: 1,
          reviewerName: 'John Manager',
          rating: 4.5,
          comments: 'Excellent performance this quarter. Strong technical skills and good teamwork.',
          date: '2024-01-15',
          goals: ['Improve code documentation', 'Take on more leadership responsibilities']
        }
      ];
      this.reviewsSubject.next(defaultReviews);
      localStorage.setItem('performanceReviews', JSON.stringify(defaultReviews));
    }
  }

  getAll(): Observable<PerformanceMetric[]> {
    return this.metrics$;
  }

  addPerformance(data: Omit<PerformanceMetric, 'id'>): Observable<PerformanceMetric> {
    return new Observable(observer => {
      const current = this.metricsSubject.value;
      const newMetric: PerformanceMetric = {
        ...data,
        id: Date.now()
      };
      const updated = [...current, newMetric];
      this.metricsSubject.next(updated);
      localStorage.setItem('performanceMetrics', JSON.stringify(updated));
      observer.next(newMetric);
      observer.complete();
    });
  }
}
