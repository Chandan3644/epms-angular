import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';


const routes: Routes = [
  // Public routes
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  // Protected routes
 {
  path: 'dashboard',
  canActivate: [AuthGuard,RoleGuard],
data: { roles: ['Admin'] },
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
},
  {
    path: 'projects',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ProjectManager' },
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Developer' },
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
  },
  {
  path: 'users',
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['Admin'] },
  loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
}
,  
  { path: '**', redirectTo: 'auth' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
