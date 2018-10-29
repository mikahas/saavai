import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserDetailResolverService } from './user-detail-resolver.service';

export const userRoutes: Routes = [
    {
        path: 'me',
        component: UserComponent,
        canActivate: [AuthGuard],
        resolve: {
            user: UserDetailResolverService
        }
    }
];