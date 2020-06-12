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

import { MatAutocompleteModule, 
         MatButtonModule,
         MatCardModule,
         MatRippleModule, 
         MatOptionModule,
         MatDialogModule,
         MatFormFieldModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatMenuModule,
         MatPaginatorModule,
         MatProgressBarModule,
         MatSelectModule,
         MatSnackBar,
         MatSnackBarModule,
         MatCheckboxModule,
         MatBottomSheetModule
} from '@angular/material';

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
    ],
    exports: [TestComponent,QuestionsAnswersComponent,Congratulation],
    providers: [DataService,TrainingTestService,MatSnackBar],
    declarations: [TestComponent,QuestionsAnswersComponent,Congratulation,SnackbarAlertComponent],
    entryComponents:[QuestionsAnswersComponent,SnackbarAlertComponent]
  })
  export class TrainingTestModule { }