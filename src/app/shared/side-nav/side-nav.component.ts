import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { NAV_SECTIONS, NAV_LINKS, ROLE_ADMIN } from '../configuration/pages';


import {
  MdcButtonModule,
  MdcFabModule,
  MdcIconModule,
  MdcDrawerModule,
  MdcMenuModule,
  MdcListModule
} from '@angular-mdc/web';

import {FlexLayoutModule} from '@angular/flex-layout';
import { RouterService } from '../service/router-service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isOpen = false;
  icon = "menu";
  constructor(private routerService: RouterService) { }

 
  route = this.routerService;
 


  ngOnInit() {
  }

  _isOpen(){
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      this.icon = "close";
    }else{
      this.icon = "menu";
    }
  }

}


@NgModule({
  imports: [
    MdcButtonModule,
    MdcFabModule,
    MdcIconModule,
    MdcDrawerModule,
    MdcMenuModule,
    MdcListModule,
    FlexLayoutModule,
    CommonModule,
    RouterModule
  ],
  exports: [SideNavComponent],
  declarations: [SideNavComponent],
})
export class SideNavPageModule { }
