import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '../../pages/admin-dashboard/admin-dashboard';
import { AuthGuard } from 'src/app/shared/helper/auth.guard';


export const AdminLayoutRoutes: Routes  = [

   { path:'admin-dashboard', component: AdminDashboardComponent,canActivate: [AuthGuard]},
  
  ];