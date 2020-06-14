import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { NAV_SECTIONS, NAV_LINKS, ROLE_ADMIN } from '../configuration/pages';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../shared/service/authentication.service';




import {
  MdcButtonModule,
  MdcFabModule,
  MdcIconModule,
  MdcDrawerModule,
  MdcMenuModule,
  MdcListModule
} from '@angular-mdc/web';

import {FlexLayoutModule} from '@angular/flex-layout';
import { RouterService } from '../service/router.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material';
import {MatSlideToggleModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isOpen = false;
  login = false;
  user = null;
  username = 'none';
  constructor(private routerService: RouterService,private authservice: AuthenticationService) { }

 
  route = this.routerService;
 

  //admin toggle
  isChecked = false;


  ngOnInit() {
    if(localStorage.getItem('currentUser') !== null){
      this.login = true;
      this.user = JSON.parse(window.localStorage.getItem('currentUser')); 
      this.username = this.user.username;
    }
    
  }

  _isOpen(){
    this.isOpen = !this.isOpen;
   
  }


  public logOut(){
    this.authservice.logout();
    this.login = false ;
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
    RouterModule,
    NgbCollapseModule,
    MatSlideToggleModule,
    FormsModule
  ],
  exports: [SideNavComponent],
  declarations: [SideNavComponent],
})
export class SideNavPageModule { }
