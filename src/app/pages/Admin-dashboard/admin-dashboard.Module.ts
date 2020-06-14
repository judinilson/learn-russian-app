import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

@NgModule({
    imports:[
        CommonModule,
        RouterModule],
    exports:[AdminDashboardComponent],
    declarations:[AdminDashboardComponent],
    providers:[],
  
  })
  export class AdminDashboardModule{}