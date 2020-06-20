import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/shared/service/identity.service';
import { until } from 'protractor';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { TrainingTestService } from 'src/app/shared/service/training-test.service';
import { MatDialog } from '@angular/material';
import { DialogUserStudentComponent } from './user-student-dialog/dialog-user-student';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {

  Users: any;
  studentUsers = []
  countries: any;
  teacherGroups: any;
  groups: any;
  usersRoleStudent = []
  statistics: any;
  lastuserstatistic = 0;
  isQuery = true; 
  selected:boolean[] = [];
  constructor(
    private identityService: IdentityService,
    private trainingService: TrainingTestService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {


    this.getAllUsers()




  }

  getAllUsers() {
    this.getAllCountries()
    this.getAllStatistic()
    this.getAllGroup()
    this.getAllGroupRelatedToTeacher()

    this.identityService.userGet()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          this.Users = data;
          this.studentUsers = this.Users.filter(x => x.role === 2)

          this.filterStudentUser()
          this.isQuery = false;
        },
        error => {
          console.log("Error trying to get Users: ", error);
        }
      )
  }

  getAllGroup() {
    this.identityService.UserGroupGet()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          this.groups = data
          // console.log("All Existed Groups: ", data);
        },
        error => {
          console.log("Ocurred error trying to get Groups: ", error);
        }
      )
  }

  getAllGroupRelatedToTeacher() {
    this.identityService.teacherGroupGet()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          this.teacherGroups = data
          // console.log("All groups that related to teacher: ", data);
        },
        error => {
          console.log("Ocurred error trying to get releted teachers group: ", error);
        }
      )
  }

  getAllCountries() {
    this.identityService.countryGetAll()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          this.countries = data
          // console.log("All Countries: ", this.countries);


        },
        error => {
          console.log("Ocurred error trying to get Countries: ", error);
        }
      )
  }

  getAllStatistic() {
    this.trainingService.getStatistic()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          this.statistics = data;
          // console.log("All statistic: ", data);
        },
        error => {
          console.log("Error trying to request all statistics: ", error);
        }
      )
  }


  filterStudentUser() {
    setTimeout(() => {
      this.studentUsers.forEach(x =>{
        var ct = this.countries.filter(c => c.id == x.countryId) //country
        var tg = this.teacherGroups.filter(t => t.id == x.teacherGroupId) //teacher group(the relation between teacher and group)
        var teacher = this.Users.filter(u => u.id == tg[0].teacherId) // teacher
        var g = this.groups.filter(g => g.id == tg[0].groupId) //group
        var st = this.statistics.filter(s => s.userId == x.id) //statistic
       


        if(st.length !== 0){
          var _statistic = []
          st.forEach(x => {
            _statistic.push({
              id: x.id,
              backToArticleCount: x.backToArticleCount,
              percentageCorrectAnswers: x.percentageCorrectAnswers,
              percentageIncorrectAnswers: x.percentageIncorrectAnswers,
              trainingDate: new Date(x.trainingDate),
              userId: x.userId
            })
          })
          this.usersRoleStudent.push({
            user: x,
            country: ct[0], //push just the first elements because array have just one element
            group: g[0],
            teacher: teacher[0],
            statistic: st,
            laststatistic: st.length - 1
          })
        }else{
          this.usersRoleStudent.push({
            user: x,
            country: ct[0], //push just the first elements because array have just one element
            teacher: teacher[0],
            group: g[0],
          })
          
        }


      
      })

      console.log('the student: ',this.usersRoleStudent);

      
    }, 1000);
  }


  userinfo(data,i){
    console.log("User info has trigged; user: ",data)
    console.log("the selected item: ",this.selected)
    console.log("the selected item index: ",i)

    if(this.selected[i] !== true){
      const dialogRef = this.dialog.open(DialogUserStudentComponent,{
        width: '750px',
        data:{
          data
        }
      })
  
      dialogRef.afterClosed()
        .pipe(debounceTime(300))
        .pipe(distinctUntilChanged())
        .subscribe(result =>{
          
        })
    }
    
  }

}
