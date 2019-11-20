import { CommonModule} from '@angular/common';
import { Component, OnInit, NgModule  } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatTreeModule,
  MatExpansionModule

} from '@angular/material';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {

  menuShowMore = false;
   arrowIcon = 'arrow_drop_down';
  images = [
    '../../../assets/Images/carousel/russiaFlag.jpg',
    '../../../assets/Images/carousel/moscow_city.jpg',
    '../../../assets/Images/carousel/Astrakhan-K.jpg'
  ];

  constructor() {

   }

  ngOnInit() {
  }

  showMore() {
    this.menuShowMore = !this.menuShowMore;
    this.arrowIcon = this.changeArrowIcon();
  }

  changeArrowIcon(): string {
    if (!this.menuShowMore) {
      return 'arrow_drop_down';
    } else {
      return 'arrow_drop_up ';
    }
    // this.arrowIcon = !this.arrowIcon;
  }

  // tslint:disable-next-line:member-ordering
  // arrowIcon = this.changeArrowIcon();

}




@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
      RouterModule,
      MatTreeModule,
      MatExpansionModule
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
})
export class DashboardPageModule { }
