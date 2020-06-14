import { Component, OnInit, NgModule } from '@angular/core';
import { Role } from '../Model/role';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
    selector: 'admin-switch-user',
    templateUrl: './admin-switch-user.html',
    styleUrls: ['./admin-switch-user.scss']
  })
  export class AdminSwitchUser implements OnInit {
    currentUser: any;
    isAdmin = false;

    constructor(){}
    ngOnInit() {
        if(localStorage.getItem('currentUser')  !== null){
            this.currentUser = JSON.parse(window.localStorage.getItem('currentUser')); 
            if(this.currentUser.role === Role.Admin || this.currentUser.role === Role.Teacher)
            {
                this.isAdmin = true;
            }
            
        }
    }
  }

  @NgModule ({
      imports: [
        CommonModule,
        RouterModule,
    ],
      declarations:[AdminSwitchUser],
      exports: [AdminSwitchUser]
  })
  export class AdminSwitchUserModule {}