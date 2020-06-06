import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router } from '@angular/router';
import { DemoService } from 'src/app/shared/service/content-demo-service';
import { DataService } from 'src/app/shared/service/dataService';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';

@Component({
  selector: 'app-content-texts',
  templateUrl: './content-texts.html',
  styleUrls: ['./content-texts.scss'],
})
export class ContentTextsComponent implements OnInit {

  selectedCategory: any;
  login = false;
  user = null;
  username = 'none';
  currentTrainingTestIndex: boolean;
  continueTestAlert: boolean;
  constructor(
    private routerService: RouterService,
    private router: Router,
    private demoService: DemoService,
    private dataService: DataService,
    private authservice: AuthenticationService
    ) { }

 


  route = this.routerService;
  dataSource = this.dataService.articleDataService;

  

    categories() {
      return  this.dataSource.filter(
        (items, i, arr) => arr.findIndex(x => x.category === items.category) === i);
    }
    filteredCategory() {
      return this.dataSource.filter(x => x.category === this.selectedCategory);
    }

  ngOnInit() {

    // this.dataSource.forEach((el,i) => {
    //   el.article = this.lorem.getLineEnding()
    // });

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

  onSelectedCardArticle(content: any) {
    this.router.navigateByUrl('/visual-article');
    this.demoService.newContentArticle(content);
    console.log(content);

  }

  public logOut(){
    this.authservice.logout();
    this.login = false ;
  }
}

