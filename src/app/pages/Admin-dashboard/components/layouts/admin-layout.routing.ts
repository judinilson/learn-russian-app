import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '../../pages/admin-dashboard/admin-dashboard';
import { AuthGuard } from 'src/app/shared/helper/auth.guard';
import { UsersManagementComponent } from '../../pages/users-management/users-management.component';
import { DemonstrationsManagementComponent } from '../../pages/demonstrations-management/demonstrations-management.component';
import { ArticlesManagementComponent } from '../../pages/articles-management/articles-management.component';
import { TrainingManagementComponent } from '../../pages/training-management/training-management.component';
import { UploadTaskComponent } from '../../pages/demonstrations-management/upload/upload-task.component';


export const AdminLayoutRoutes: Routes  = [

   { path:'admin-dashboard', component: AdminDashboardComponent,canActivate: [AuthGuard]},
   { path:'admin-users', component: UsersManagementComponent,canActivate: [AuthGuard]},
   { path:'admin-demonstrations', component: DemonstrationsManagementComponent,canActivate: [AuthGuard]},
   { path:'admin-articles', component: ArticlesManagementComponent,canActivate: [AuthGuard]},
   { path:'admin-training', component: TrainingManagementComponent,canActivate: [AuthGuard]},
   {path:'admin-uploadTask',component:UploadTaskComponent,canActivate:[AuthGuard]},
   
  ];