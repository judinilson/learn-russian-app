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
import {
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatTreeModule,
  MatExpansionModule

} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  isDroped = false;
  icon = 'arrow_drop_down';


  get navSection() {
    return NAV_SECTIONS[this.currentSection];
  }
  get navLinks() {
    return NAV_LINKS;
  }

  get currentSection() {
    return ROLE_ADMIN;
  }

  // destinations = [
  //   { label: 'Inbox', icon: 'inbox', activated: true },
  //   { label: 'Star', icon: 'star', activated: false },
  //   { label: 'Sent Mail', icon: 'send', activated: false },
  //   { label: 'Drafts', icon: 'drafts', activated: false }
  // ];


  ngOnInit() {
  }



  _isDroped() {
    this.isDroped = !this.isDroped;
    // tslint:disable-next-line:no-non-null-assertion
    if ( this.isDroped! ) {
      this.icon = 'arrow_drop_up';
    } else {
      this.icon = 'arrow_drop_down';
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
