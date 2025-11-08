import { Routes } from '@angular/router';

import { LandingPage } from './landing/landing';
import { LoginPage } from './login/login';
import { RegisterPage } from './register/register';


import { DashboardComponent } from './dashboard/dashboard';
import { OverviewPage } from './dashboard/pages/overview/overview';
import { EmployeesComponent } from './dashboard/pages/employees/employees';
import { AnalyticsComponent } from './dashboard/pages/analytics/analytics';
import { SettingsComponent } from './dashboard/pages/settings/settings';
import { PerformanceComponent } from './dashboard/pages/performance/performance';
import { AnnouncementsComponent } from './dashboard/pages/announcements/announcements';


import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ProfileSettingsComponent } from './employee-dashboard/profile-settings/profile-settings';
import { ProfileComponent } from './employee/profile/profile';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      { path: '', redirectTo: '/dashboard/overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewPage },
      { path: 'employees', component: EmployeesComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'performance', component: PerformanceComponent },
      { path: 'announcements', component: AnnouncementsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
  { path: 'employee-settings', component: ProfileSettingsComponent, canActivate: [AuthGuard] },


  // ✅ Employee Dashboard
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'employee-dashboard/profile', component: ProfileComponent },


  { path: '**', redirectTo: '', pathMatch: 'full' },
];
