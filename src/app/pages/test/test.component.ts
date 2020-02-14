import { Component, OnInit, NgModule } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router, RouterModule } from '@angular/router';
import { DataService } from 'src/app/shared/service/dataService';
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


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  constructor(
    private routerService: RouterService,
    private router: Router,
    private dataService: DataService
  ) { }

  dataSource = this.dataService.trainingDataService;
  demoDataSource = this.dataService.demoDataService;
  route = this.routerService;
  selectedCategory: any;
  ngOnInit() {
  }

  categories(){
    return  this.dataSource.filter(
      (items, i,arr) => arr.findIndex(x => x.category === items.category) === i);
  }

  filteredCategory(){
    return this.dataSource.filter(x => x.category == this.selectedCategory);
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
  exports: [TestComponent],
  providers: [DataService],
  // tslint:disable-next-line:max-line-length
  declarations: [TestComponent],
})
export class TestModule { }