import { Component, OnInit } from '@angular/core';
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
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SideNavPageModule } from 'src/app/shared/side-nav/side-nav.component';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


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
  exports: [StatisticComponent],
  providers: [DataService],
  declarations: [StatisticComponent],
})
export class StatisticModule { }

