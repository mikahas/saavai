import { LoginComponent } from './login/login/login.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { WeatherLocationsResolverService } from './resolvers/weather-locations-resolver.service';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        resolve: {
            locations: WeatherLocationsResolverService
        }
    }
    // { path: '**', component: PageNotFoundComponent }
];
