import { Routes } from '@angular/router';

// Landing + Auth Pages
import { LandingPage } from './landing/landing';
import { LoginPage } from './login/login';
import { RegisterPage } from './register/register';

// HR Dashboard + Pages
import { DashboardComponent } from './dashboard/dashboard';
import { OverviewPage } from './dashboard/pages/overview/overview';
import { EmployeesComponent } from './dashboard/pages/employees/employees';
import { AnalyticsComponent } from './dashboard/pages/analytics/analytics';
import { SettingsComponent } from './dashboard/pages/settings/settings';
import { ProjectsComponent } from './dashboard/pages/projects/projects';
import { PerformanceComponent } from './dashboard/pages/performance/performance';
import { AnnouncementsComponent } from './dashboard/pages/announcements/announcements';

// Employee Dashboard
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },

  // ✅ HR Dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewPage },
      { path: 'employees', component: EmployeesComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'performance', component: PerformanceComponent },
      { path: 'announcements', component: AnnouncementsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },

  // ✅ Employee Dashboard
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
