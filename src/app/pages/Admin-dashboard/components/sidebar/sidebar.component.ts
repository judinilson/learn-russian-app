import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';




@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
  })
  export class SideBarComponent implements OnInit {

     menuItems: any[];
    isCollapsed = true;
    login: boolean;
    username: any;

    isDroped = false
  
    constructor(
      private router: Router,
      private authservice: AuthenticationService 
      ) { }
  
    ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
     });

     if(localStorage.getItem('currentUser') !== null){
      this.login = true;
      var user = JSON.parse(window.localStorage.getItem('currentUser')); 
      this.username = user.username;
    }
    }

    isDropDown(){
      this.isDroped = !this.isDroped;
    }

    public logOut(){
      this.authservice.logout();
      this.login = false ;
    }
    
  }


declare interface Sublinks{
    path: string;
    title: string;
    icon: string;
}
  
declare interface RouteInfo {
    path?: string;
    title: string;
    icon: string;
    sublinks?: Sublinks[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin-dashboard', title: 'Dashboard',  icon: 'fa fa-desktop text-primary',  },
    { path: '/admin-users', title: 'Users',  icon: 'fa fa-users text-primary',  },
    
    { 
      title: 'Contents',  
      icon:'fa fa-window-restore text-blue',  
      sublinks:[
         { path: '/admin-demonstrations', title: 'Demonstrations',  icon:'fas fa-chalkboard text-orange',  },
        { path: '/admin-articles', title: 'Articles',  icon:'far fa-newspaper text-yellow',  },
      ]
    },
    
    
    { path: '/', title: 'Exit Admin mode',  icon:'fas fa-external-link-alt text-red',  },
];