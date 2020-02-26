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
  } from '@angular-mdc/web';
  import {
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
  
  } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from 'src/app/shared/service/dataService';
import { TestComponent } from './test.component';
import {QuestionsAnswersComponent} from './questions-answers/questions-answers.component'
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrainingTestService } from 'src/app/shared/service/training-test-service';
import { SideNavPageModule } from 'src/app/shared/side-nav/side-nav.component';
import { Congratulation } from './congratulation-page/congratulation';
  

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
  
      CommonModule,
      FlexLayoutModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
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
    providers: [DataService,TrainingTestService],
    // tslint:disable-next-line:max-line-length
    declarations: [TestComponent,QuestionsAnswersComponent,Congratulation],
  })
  export class TrainingTestModule { }