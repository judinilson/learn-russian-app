import { CommonModule} from '@angular/common';
import { Component, OnInit,NgModule  } from '@angular/core';

import{
  MatSidenavModule,
  MatButtonModule,
  MatIconModule
}from '@angular/material'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {


  images = [
    '../../../assets/Images/carousel/russiaFlag.jpg', 
    '../../../assets/Images/carousel/moscow_city.jpg',
    '../../../assets/Images/carousel/Astrakhan-K.jpg'
  ];

  constructor() {

   }

  ngOnInit() {
  }

  
}




@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
      MatButtonModule,
      MatIconModule
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
})
export class DashboardPageModule { }
