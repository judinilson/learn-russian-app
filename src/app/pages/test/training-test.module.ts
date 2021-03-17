import {
    MdcSelectModule,
    MdcTopAppBarModule,
    MdcDrawerModule,
    MdcCardModule,
    MdcButtonModule,
    MdcFabModule,
    MdcIconModule,
    MdcMenuModule,
    MdcListModule,
    MdcSnackbar,
  } from '@angular-mdc/web';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { DataService } from 'src/app/shared/service/dataService';
import { TestComponent } from './test.component';
import {QuestionsAnswersComponent} from './questions-answers/questions-answers.component'
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrainingTestService } from 'src/app/shared/service/training-test.service';
import { SideNavPageModule } from 'src/app/shared/side-nav/side-nav.component';
import { Congratulation } from './congratulation-page/congratulation';
import { SnackbarAlertComponent } from './snackbar-alert/snackbar-alert';
import { NotNetworkModule } from 'src/app/shared/not-network/not-network';


  

@NgModule({
    imports: [
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
      MatSnackBarModule ,
      MatCheckboxModule,
      MatBottomSheetModule,
      MatSidenavModule,
      MatToolbarModule,
  
      CommonModule,
      FlexLayoutModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      DragDropModule,
      SideNavPageModule,

      //mdc
      MdcButtonModule,
      MdcFabModule,
      MdcIconModule,
      MdcMenuModule,
      MdcListModule,
      MdcCardModule,
      MdcTopAppBarModule,
      MdcDrawerModule,
      MdcSelectModule,

      //alertmodule
      NotNetworkModule
    ],
    exports: [TestComponent,QuestionsAnswersComponent,Congratulation],
    providers: [DataService,TrainingTestService,MatSnackBar],
    declarations: [TestComponent,QuestionsAnswersComponent,Congratulation,SnackbarAlertComponent],
    entryComponents:[QuestionsAnswersComponent,SnackbarAlertComponent]
  })
  export class TrainingTestModule { }