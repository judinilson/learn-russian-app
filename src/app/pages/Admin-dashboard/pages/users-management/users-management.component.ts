import { Component, OnInit, ErrorHandler } from '@angular/core';
import { IdentityService } from 'src/app/shared/service/identity.service';
import { until } from 'protractor';
import { first, debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import { TrainingTestService } from 'src/app/shared/service/training-test.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogUserStudentComponent } from './user-student-dialog/dialog-user-student';
import { Role } from 'src/app/shared/Model/role';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.all'
import { DialogUserTeacherComponent } from './user-teacher-dialog/dialog-user-teacher';

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
  selected: boolean[] = [];
  allApiCountries: any;
  apiCountries: any[];
  postCountry: any;
  postCountryId: any;
  error: any;
  studentRole: Role.Student;
  selectedUserIndex = 0;
  selectedUserData = [];
  confirmDelete = false;
  collapsetableStudent: boolean;
  collapsetableStudentStatistic: boolean;
  teacherUsers: any;
  groupAndTeacher = [];
  collapsetableTeacher: boolean;
  collapsetablegroups: boolean;

  constructor(
    private identityService: IdentityService,
    private trainingService: TrainingTestService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {


    this.getAllUsers()

    this.identityService.geCountries().subscribe(allCountriesdata => {
      this.allApiCountries = allCountriesdata
      this.getApiCountries();
    })


  }

  getAllUsers() {
    this.getAllStudentsCountries()
    this.getAllStatistic()
    this.getAllGroup()
    this.getAllGroupRelatedToTeacher()

    setTimeout(() => {
      this.identityService.userGet()
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(
          data => {
            this.Users = data;
            this.studentUsers = this.Users.filter(x => x.role === 2)
            this.teacherUsers = this.Users.filter(x => x.role === 1)
            console.log("teacher:", this.teacherUsers);
            console.log("Group: ", this.groups);
            console.log("TeacherGroup: ", this.teacherGroups);

            this.filterStudentUser()
            this.filterGroupAndTeacher()
            this.isQuery = false;
          },
          error => {
            console.log("Error trying to get Users: ", error);
          }
        )
    }, 2000)

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

  getAllStudentsCountries() {
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

  // filter student user 
  filterStudentUser() {
    setTimeout(() => {
      this.studentUsers.forEach(x => {
        var ct = this.countries !== undefined ? this.countries.filter(c => c.id == x.countryId) : [] //country  
        var tg = this.teacherGroups !== undefined ? this.teacherGroups.filter(t => t.id == x.teacherGroupId) : [] //teacher group(the relation between teacher and group)
        var teacher = this.Users !== undefined ? this.Users.filter(u => u.id == tg[0].teacherId) : [] // teacher
        var g = this.groups !== undefined ? this.groups.filter(g => g.id == tg[0].groupId) : [] //group
        var st = this.statistics !== undefined ? this.statistics.filter(s => s.userId == x.id) : []//statistic



        if (st.length !== 0) {
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
        } else {
          this.usersRoleStudent.push({
            user: x,
            country: ct[0], //push just the first elements because array have just one element
            teacher: teacher[0],
            group: g[0],
          })

        }



      })

      console.log('the student: ', this.usersRoleStudent);


    }, 1000);
  }

  // filter group and join with teacher user name
  filterGroupAndTeacher() {

    this.teacherGroups.forEach(item => {

      var tg = this.teacherUsers.filter(x => x.id === item.teacherId)
      var gt = this.groups.filter(x => x.id === item.groupId)

      if (tg != null && gt != null) {
        this.groupAndTeacher.push({
          teacher: tg[0],
          group: gt[0],
          teachingTime: item.teaching_time
        })
      }

    })
  }

  // get student user info 
  userinfo(data) {

    console.log("info: ",data)
    if(data.country){
      const dialogRef = this.dialog.open(DialogUserStudentComponent, {
        width: '750px',
        data: {
          data,
          userInfo: true
        }
      })

      dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result => {

      })
    }
    else{
      var teachergroup = null;
      this.teacherGroups.forEach(item => {
        if(data.id === item.teacherId) {
          var tg = this.groups.filter(x => x.id === item.groupId)
          teachergroup = tg[0]
        }
        
      })

      const dialogRef = this.dialog.open(DialogUserTeacherComponent, {
        width: '750px',
        data: {
          user: data,
          userInfo: true,
          group: teachergroup 
        }
      })

      dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result => {

      })

    }

    
    

    


  }

  //create new student dialog
  userStudentCreateDialog() {

    const dialogRef = this.dialog.open(DialogUserStudentComponent, {
      width: '750px',
      data: {
        countries: this.apiCountries,
        groups: this.groups,
        createUser: true
      }
    })

    dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result => {
        console.log("dialog responde: ", result);
        var observable = new Observable(observer => {
          observer.next(3);
          if (result !== null) {
            this.countryPost(
              result.country.name,
              result.country.language,
              result.country.region);

            setTimeout(() => {
              observer.next(4);
              this.userStudentCreate(
                result.groupId,
                result.firstname,
                result.lastname,
                result.username,
                result.password
              )
              observer.complete();
            }, 6000)
          }

        });

        observable.subscribe({
          next: x => console.log('got value ' + x),
          error: err => console.error('something wrong occurred: ' + err),
          complete: () => console.log('done'),
        });
      })

  }


  // update student dialog
  userStudentUpdateDialog(data) {

    const dialogRef = this.dialog.open(DialogUserStudentComponent, {
      width: '750px',
      data: {
        item: data,
        groups: this.groups,
        updateUser: true
      }
    })

    dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result => {
        var reletedTeacherGroup = null;
        var idReletedTeacherGroup = null;
        //this.selected = []

        console.log("dialog responde: ", result);
        if (result != null) {

          if (result.groupId === 0) {
            idReletedTeacherGroup = result.oldGroupId;
          } else {
            if (this.teacherGroups != undefined) {
              reletedTeacherGroup = this.teacherGroups.filter(tg => tg.groupId == result.groupId); //filter the groups tha have teachers releted to that group id
              idReletedTeacherGroup = reletedTeacherGroup[0].id; //id selected teacher group

            } else {
              console.log('group is unselected');
            }
          }

          this.identityService.userUpdate(result.userId,
            {
              firstname: result.firstname,
              lastname: result.lastname,
              username: result.username,
              password: result.password,
              teacherGroupId: idReletedTeacherGroup
            }
          ).pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(
              data => {
                this.usersRoleStudent = [];
                this.getAllUsers();
                this.openSweetAlertToast('success', 'updated sucessfully');

              },
              error => {
                console.log("error: ", error)
                this.openSweetAlert('error', 'Please check your connection')
              }
            )

        }


      })
    //}
    //}



  }

  // delete student user 
  deleteStudentUser(data) {

    // console.log("User delete data: ",data);

    // this.confirmDeleteAlert()
    // console.log('confirm: ', this.confirmDelete);
    var deletedId = data.user.id
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        this.identityService.userDelete(deletedId)
          .subscribe(
            data => {

              console.log('successfully deleted');
              this.openSweetAlertToast('success', 'successfully deleted')

              this.usersRoleStudent = []
              this.getAllUsers();

            },
            error => {
              console.log("error DELETE:", error);
              this.openSweetAlert('error', 'Please check your connection')
            }
          )

      }
    })


  }

  //post the user country to the db 
  countryPost(name, language, region) {
    this.identityService.countryCreate(
      {
        name: name,
        language: language,
        region: region,
      })
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        res => {
          this.postCountry = res
          this.postCountryId = this.postCountry.id

        },
        error => {
          this.error = error;
          //this.loading = false;
          //this.alert = new BehaviorSubject<boolean>(true);

        }
      );
  }

  //post the student user to the db
  userStudentCreate(groupId, firstname, lastname, username, password,) {

    var reletedTeacherGroup = null;
    var idReletedTeacherGroup = null;
    if (this.teacherGroups != undefined) {
      reletedTeacherGroup = this.teacherGroups.filter(tg => tg.groupId == groupId); //filter the groups tha have teachers releted to that group id
      idReletedTeacherGroup = reletedTeacherGroup[0].id; //id selected teacher group
    } else {
      console.log('group is unselected');
    }

    if (idReletedTeacherGroup != null && this.postCountryId != 0) {

      console.log("country ID:", this.postCountryId)
      this.identityService.userCreate(
        {
          firstname: firstname,
          lastname: lastname,
          username: username,
          countryId: this.postCountryId,
          teacherGroupId: idReletedTeacherGroup,
          password: password,
          role: this.studentRole,
          created: new Date(),
        })
        .pipe(delay(800))
        .subscribe(
          data => {
            console.log("student is created successfully!!");
            this.usersRoleStudent = []
            this.getAllUsers();
            this.openSweetAlertToast('success', 'User is successfully created');
          },
          error => {
            this.error = error;
            //this.loading = false;
            //this.alert = new BehaviorSubject<boolean>(true);
            console.log("error trying to subscribe user: ", error)
            this.openSweetAlertToast('error', error);
          });

    } else {
      console.log('group id cannot be null', this.error);
    }


  }

  // foreing rest api used to gett all countries 
  getApiCountries() {
    this.apiCountries = new Array();
    let index_ = new Array();
    this.allApiCountries.forEach((el, index) => {

      var country = { name: el.name, language: el.languages[0].name, region: el.region }
      this.apiCountries.push(country);
      index_.push(index)
    });

  }


  //filter user
  // applyFilter(user) {
  //   // const filterValue = (event.target as HTMLInputElement).value;
  //   // this.usersRoleStudent.filter = filterValue.trim().toLowerCase();
  // }


  //colapsing the table 
  collapse(type: string) {

    if (type === 'student') this.collapsetableStudent = !this.collapsetableStudent;
    if (type === 'statistic') this.collapsetableStudentStatistic = !this.collapsetableStudentStatistic;
    if (type === 'teacher') this.collapsetableTeacher = !this.collapsetableTeacher;
    if (type === 'group') this.collapsetablegroups = !this.collapsetablegroups;


  }


  /*
    SWEET ALERT DIALOGS: 
  */
  openSweetAlertToast(icon: string, message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: message//'User is successfully created'
    })

  }

  openSweetAlert(icon: string, title: string) {
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  }

  confirmDeleteAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success',

        // )

      }
    })


  }
}
