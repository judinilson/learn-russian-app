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
  import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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