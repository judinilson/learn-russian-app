import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    MatSelectModule,
    MatCheckboxModule
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
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgSelectModule } from '@ng-select/ng-select';
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
import { DialogUserStudentComponent } from './pages/users-management/user-student-dialog/dialog-user-student';
import { DialogUserTeacherComponent } from './pages/users-management/user-teacher-dialog/dialog-user-teacher';
import { DialogUserGroupComponent } from './pages/users-management/user-group-dialog/user-group-dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DropzoneDirective } from './pages/demonstrations-management/directive/dropzone.directive';
import { UploadTaskComponent } from './pages/demonstrations-management/upload/upload-task.component';
import { DialogCategoryComponent } from './pages/admin-dashboard/category-dialog/category-dialog';
import { AlertService } from 'src/app/shared/service/alert.service';
import { DialogUploadComponent } from './pages/demonstrations-management/upload/upload-dialog/upload-dialog';
import { ProgressComponent } from './pages/demonstrations-management/upload/upload-dialog/progress/progress';


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
        ReactiveFormsModule,
        FormsModule,
        ScrollingModule,
        NgSelectModule,
        NgxMaterialTimepickerModule,
        
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
        MatCheckboxModule,
        MatDialogModule,

  
    ],
    exports: [],
    declarations: [
        AdminDashboardComponent,
        UsersManagementComponent,
        DemonstrationsManagementComponent,
        ArticlesManagementComponent,
        TrainingManagementComponent,
        SideBarComponent,
        AdminLayoutComponent,
        UploadTaskComponent,

        //dialogs
        DialogUserStudentComponent,
        DialogUserTeacherComponent,
        DialogUserGroupComponent,
        DialogCategoryComponent ,
        DialogUploadComponent,
        ProgressComponent,


          //directive 
        DropzoneDirective
    ],
    providers: [
        AdminDashboardService,
        IdentityService,
         ContentService,
         TrainingTestService,
         AlertService,
    ],
    entryComponents: [
        DialogUserStudentComponent,
        DialogUserTeacherComponent,
        DialogUserGroupComponent,
        DialogCategoryComponent,
        DialogUploadComponent,
        ProgressComponent,
    ]

})
export class AdminDashboardModule { } 