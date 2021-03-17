import { SideNavComponent, SideNavPageModule } from './../../shared/side-nav/side-nav.component';
import { CommonModule} from '@angular/common';
import { Component, OnInit, NgModule  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';

import {
  MdcButtonModule,
  MdcFabModule,
  MdcIconModule,
  MdcDrawerModule,
  MdcMenuModule,
  MdcListModule
} from '@angular-mdc/web'; 
import {FlexLayoutModule} from '@angular/flex-layout';
import { AdminSwitchUserModule } from 'src/app/shared/admin-switch-user/admin-switch-user';




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
      MatExpansionModule,

      MdcButtonModule,
      MdcFabModule,
      MdcIconModule,
      MdcDrawerModule,
      MdcMenuModule,
      MdcListModule,

      FlexLayoutModule,
      SideNavPageModule,

      AdminSwitchUserModule
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
})
export class DashboardPageModule { }
