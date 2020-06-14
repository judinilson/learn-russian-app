import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';

import { 
    MdcButtonModule, 
    MdcFabModule, 
    MdcIconModule, 
    MdcDrawerModule, 
    MdcMenuModule, 
    MdcListModule } from '@angular-mdc/web';
import { SideBarComponent } from './components/sidebar/sidebar.component';

 import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { AdminLayoutRoutes } from './components/layouts/admin-layout.routing';
import { AdminLayoutComponent } from './components/layouts/admin-layout.component';
 
@NgModule({
    imports:[ 
        RouterModule.forChild(AdminLayoutRoutes),
        //mdc
    MdcButtonModule,
    MdcFabModule,
    MdcIconModule,
    MdcDrawerModule,
    MdcMenuModule,
    MdcListModule,
    
    FlexLayoutModule,
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    MatSlideToggleModule,
    FormsModule
    ],
    exports:[],
    declarations:[
        AdminDashboardComponent,
        SideBarComponent,
        AdminLayoutComponent
    ],
    providers:[],
  
  })
  export class AdminDashboardModule{} 