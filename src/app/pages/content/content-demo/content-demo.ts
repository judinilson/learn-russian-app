import { Component, OnInit, NgModule } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router } from '@angular/router';
import { DemoService } from 'src/app/shared/service/content-demo-service';
import {DataService} from 'src/app/shared/service/dataService';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';

@Component({
  selector: 'app-content-demo',
  templateUrl: './content-demo.html',
  styleUrls: ['./content-demo.scss']
})
export class ContentDemoComponent implements OnInit {

  login = false;
  user = null;
  username = 'none';
  currentTrainingTestIndex: boolean;
  continueTestAlert: boolean;
 
  constructor(
    private routerService: RouterService, 
    private router: Router,
    private demoService:DemoService,
    private dataService: DataService,
    private authservice: AuthenticationService
    ) { }

    dataSource = this.dataService.demoDataService;

  selectedCategory: any;
  route = this.routerService;

  ngOnInit() {
    if(localStorage.getItem('currentUser') !== null){
      this.login = true;
      this.user = JSON.parse(window.localStorage.getItem('currentUser')); 
      this.username = this.user.username;
     console.log(this.username);
    }


    if( 
      this.currentTrainingTestIndex = JSON.parse(localStorage.getItem('currentTestIndex')) !== null
      )this.continueTestAlert = true;
  }

  categories(){
    return  this.dataSource.filter(
      (items, i,arr) => arr.findIndex(x => x.category === items.category) === i);
  }

  filteredCategory(){
    return this.dataSource.filter(x => x.category == this.selectedCategory);
  }
  

  onSelectedCard(content:any){
    this.router.navigateByUrl('/visual-demo');
    this.demoService.newContentDemo(content);
    console.log(content);
    
  };


   public logOut(){
    this.authservice.logout();
    this.login = false ;
  }
}

