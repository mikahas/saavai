import { LoginComponent } from './login/login/login.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent }
];
