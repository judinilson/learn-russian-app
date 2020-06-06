import { Component, OnInit, NgModule } from '@angular/core';
import { RouterService } from 'src/app/shared/service/router-service';
import { Router, RouterModule } from '@angular/router';
import { DataService } from 'src/app/shared/service/dataService';
import { TrainingTestService } from 'src/app/shared/service/training-test-service';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { MatSnackBar, MatBottomSheet, MatDialog } from '@angular/material';
import { SnackbarAlertComponent } from './snackbar-alert/snackbar-alert';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  login = false;
  user = null;
  username = 'none';
  startTest: boolean;
  testIndex = 0
  getIndex: any;

  constructor(
    private routerService: RouterService,
    private router: Router,
    private dataService: DataService,
    private trainingService: TrainingTestService,
    private authservice: AuthenticationService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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
    this.getTestIndex()

    console.log(Math.round(0.6))
  }

  categories(){
    return  this.dataSource.filter(
      (items, i,arr) => arr.findIndex(x => x.category === items.category) === i);
  }

  filteredCategory(){
    return this.dataSource.filter(x => x.category == this.selectedCategory);
  }

  onSelectedCard(content:any,index){
    index += 1;
    if(this.testIndex === 0 || this.testIndex === index){
      this.setTestIndex(index,content)
      this.trainingService.newTraining(content);
      this.router.navigateByUrl('/training');
    }
    else{
      var message = content.title 
      this._userAlertTraining(message,content,index)
    }
    
   
  };


  setTestIndex(index,content){
    var newIndex = {
      'index': index,
      'content': content
    }
    localStorage.removeItem('currentTestIndex');
    localStorage.setItem('currentTestIndex',JSON.stringify(newIndex));
  }

  getTestIndex(){
    this.getIndex = JSON.parse(localStorage.getItem('currentTestIndex'))
    if(this.getIndex != null) this.testIndex = this.getIndex.index
  }

 
  

  _userAlertTraining(message,content=null,index){

    const dialogRef = this.dialog.open(SnackbarAlertComponent,{
      width: '450px',
      data:{
        message
      }
    })

    dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result =>{
        if(result != null){

          var _content: any;
          console.log("dialog result: ",result);
          if(result.continue){
            this.trainingService._continue = true;
            this.getIndex = JSON.parse(localStorage.getItem('currentTestIndex'))
            console.log('current test index: ', this.getIndex);
            if(this.getIndex != null) {
              this.testIndex = this.getIndex.index
              _content = this.getIndex.content
              this.router.navigateByUrl('/training');
              this.trainingService.newTraining(_content);
            }
           
          }
          if(result.new){
            this.trainingService._start = true
            this.setTestIndex(index,content)
            this.router.navigateByUrl('/training');
            this.trainingService.newTraining(content);
          }
        }
       
      })
  }

  public logOut(){
    this.authservice.logout();
    this.login = false ;
  }

}



