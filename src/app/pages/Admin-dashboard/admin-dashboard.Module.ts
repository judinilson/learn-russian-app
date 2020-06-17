import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {
    MatSlideToggleModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatRippleModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatOptionModule,
    MatDialogModule,
    MatSelectModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import {
    MdcButtonModule,
    MdcFabModule,
    MdcIconModule,
    MdcDrawerModule,
    MdcMenuModule,
    MdcListModule
} from '@angular-mdc/web';
import { SideBarComponent } from './components/sidebar/sidebar.component';

import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { AdminLayoutRoutes } from './components/layouts/admin-layout.routing';
import { AdminLayoutComponent } from './components/layouts/admin-layout.component';
import { AdminDashboardService } from 'src/app/shared/service/admin-dashboard.service';
import { IdentityService } from 'src/app/shared/service/identity.service';
import { ContentService } from 'src/app/shared/service/content.service';
import { TrainingTestService } from 'src/app/shared/service/training-test.service';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { DemonstrationsManagementComponent } from './pages/demonstrations-management/demonstrations-management.component';
import { ArticlesManagementComponent } from './pages/articles-management/articles-management.component';
import { TrainingManagementComponent } from './pages/training-management/training-management.component';

@NgModule({
    imports: [
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
        FormsModule,
        ChartsModule,

        //mat
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatRippleModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        MatOptionModule,
        MatDialogModule,
        MatSelectModule,
    ],
    exports: [],
    declarations: [
        AdminDashboardComponent,
        UsersManagementComponent,
        DemonstrationsManagementComponent,
        ArticlesManagementComponent,
        TrainingManagementComponent,
        SideBarComponent,
        AdminLayoutComponent
    ],
    providers: [
        AdminDashboardService,
        IdentityService,
         ContentService,
         TrainingTestService
    ],

})
export class AdminDashboardModule { } 