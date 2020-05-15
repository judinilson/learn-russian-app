import { Component, OnInit, NgModule } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router, RouterModule } from '@angular/router';
import { DataService } from 'src/app/shared/service/dataService';
import { TrainingTestService } from 'src/app/shared/service/training-test-service';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  login = false;
  user = null;
  username = 'none';

  constructor(
    private routerService: RouterService,
    private router: Router,
    private dataService: DataService,
    private trainingService: TrainingTestService,
    private authservice: AuthenticationService
  ) { }

  dataSource = this.dataService.trainingDataService;
  demoDataSource = this.dataService.demoDataService;
  route = this.routerService;
  selectedCategory: any;


  ngOnInit() {

    if(localStorage.getItem('currentUser') !== null){
      this.login = true;
      this.user = JSON.parse(window.localStorage.getItem('currentUser')); 
      this.username = this.user.username;
     console.log(this.username);
    }
  }

  categories(){
    return  this.dataSource.filter(
      (items, i,arr) => arr.findIndex(x => x.category === items.category) === i);
  }

  filteredCategory(){
    return this.dataSource.filter(x => x.category == this.selectedCategory);
  }

  onSelectedCard(content:any){
    this.router.navigateByUrl('/training');
    this.trainingService.newTraining(content);
    console.log(content);
    
  };


  public logOut(){
    this.authservice.logout();
    this.login = false ;
  }

}



