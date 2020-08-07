import { Component, OnInit, ErrorHandler } from '@angular/core';
import { IdentityService } from 'src/app/shared/service/identity.service';
import { first, debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import { TrainingTestService } from 'src/app/shared/service/training-test.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogUserStudentComponent } from './user-student-dialog/dialog-user-student';
import { Role } from 'src/app/shared/Model/role';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.all'
import { DialogUserTeacherComponent } from './user-teacher-dialog/dialog-user-teacher';
import { DialogUserGroupComponent } from './user-group-dialog/user-group-dialog';
import { AlertService } from 'src/app/shared/service/alert.service';

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
  teacherRole: Role.Teacher;
  selectedUserIndex = 0;
  selectedUserData = [];
  confirmDelete = false;
  collapsetableStudent: boolean;
  collapsetableStudentStatistic: boolean;
  teacherUsers: any;
  groupAndTeacher = [];
  collapsetableTeacher: boolean;
  collapsetablegroups: boolean;
  createdGroupId: Number;

  constructor(
    private identityService: IdentityService,
    private trainingService: TrainingTestService,
    private alertService: AlertService,
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
    this.usersRoleStudent = [];
    setTimeout(() => {
      if (this.studentUsers !== undefined) {
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
      }



    }, 1000);
  }

  // filter group and join with teacher user name
  filterGroupAndTeacher() {
    this.groupAndTeacher = []

    if(this.teacherGroups !== undefined){
      this.teacherGroups.forEach(item => {

        var tg = this.teacherUsers.filter(x => x.id === item.teacherId)
        var gt = this.groups.filter(x => x.id === item.groupId)
  
        if (tg != null && gt != null) {
          this.groupAndTeacher.push({
            teacherGroupId: item.id,
            teacher: tg[0],
            group: gt[0],
            teachingTime: item.teaching_time
          })
        }
  
      })
    }
    

    console.log(this.groupAndTeacher);

  }

  // get user info 
  userinfo(data) {

    console.log("info: ", data)
    if (data.country) {
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
    else {
      var teachergroup = null;
      this.teacherGroups.forEach(item => {
        if (data.id === item.teacherId) {
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


  /*
    STUDENT: (CREATE,UPDATE,DELETE)
  */

  //create new student dialog
  userStudentCreateDialog() {
    var groups = []
    this.groupAndTeacher.forEach(x=>{groups.push(x.group)})

    const dialogRef = this.dialog.open(DialogUserStudentComponent, {
      width: '750px',
      data: {
        countries: this.apiCountries,
        groups:  groups,
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
            }, 600)
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
                this.alertService.openSweetAlertToast('success', 'updated sucessfully');
                this.getAllUsers();

              },
              error => {
                console.log("error: ", error)
                this.alertService.openSweetAlert('error', 'Please check your connection')
              }
            )

        }


      })
    //}
    //}



  }

  // delete student user 
  deleteUser(data, role) {

    var deletedId = 0;
    if (role === 'student') deletedId = data.user.id
    if (role === 'teacher') deletedId = data.id
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
              this.alertService.openSweetAlertToast('success', 'successfully deleted')
              this.getAllUsers();

            },
            error => {
              this.alertService.openSweetAlert('error', 'Please check your connection')
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
      console.log(this.teacherGroups)
      idReletedTeacherGroup = reletedTeacherGroup[0].id; //id selected teacher group
    } else {
      console.log('group is unselected');
    }

    if (idReletedTeacherGroup != null && this.postCountryId != 0) {

      console.log("country ID:", this.postCountryId)
      this.identityService.studentUserCreate(
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
            this.alertService.openSweetAlertToast('success', 'User is successfully created');
            this.getAllUsers();
          },
          error => {
            this.error = error;
            //this.loading = false;
            //this.alert = new BehaviorSubject<boolean>(true);
            this.alertService.openSweetAlertToast('error', error);
          });

    } else {
      console.log('group id cannot be null', this.error);
    }


  }


  /*
    TEACHER: (CREATE,UPDATE,DELETE)
  */

  userTeacherCreateDialog() {

    const dialogRef = this.dialog.open(DialogUserTeacherComponent, {
      width: '750px',
      data: {
        createUser: true
      }
    })

    dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result => {
        console.log("dialog responde: ", result);
        if (result !== null) {
          this.userTeacherCreate(
            result.firstname,
            result.lastname,
            result.username,
            result.subject,
            result.password
          )
        }


      })

  }

  //post the teacher user to the db
  userTeacherCreate(firstname, lastname, username, subject, password) {
    this.identityService.teacherUserCreate(
      {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        subject: subject,
        role: this.studentRole,
        created: new Date(),
      })
      .pipe(delay(800))
      .subscribe(
        data => {
          this.alertService.openSweetAlertToast('success', 'User is successfully created');
          this.getAllUsers();
        },
        error => {
          this.error = error;
          this.alertService.openSweetAlertToast('error', error);
        });
  }


  // update student dialog
  userTeacherUpdateDialog(data) {

    const dialogRef = this.dialog.open(DialogUserTeacherComponent, {
      width: '750px',
      data: {
        item: data,
        updateUser: true
      }
    })

    dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result => {

        console.log("dialog responde: ", result);
        if (result !== null) {

          this.identityService.userUpdate(result.userId,
            {
              firstname: result.firstname,
              lastname: result.lastname,
              username: result.username,
              password: result.password,
              //teacherGroupId: idReletedTeacherGroup
            }
          ).pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(
              data => {
                this.alertService.openSweetAlertToast('success', 'updated sucessfully');
                this.getAllUsers();

              },
              error => {
                console.log("error: ", error)
                this.alertService.openSweetAlert('error', 'Please check your connection')
              }
            )

        }


      })
    //}
    //}



  }


  /*
    GROUP: (CREATE,UPDATE,DELETE)
  */

  teacherFilterCount(array, teacher) {
    var count = 0;
    for (let index = 0; index < array.length; index++) {
      if (array[index].teacherId === teacher.id) {
        count += 1
      }

    }
    return count;
  }

  userGroupCreateDialog() {
    var count = 0
    var teachers = []

    //if teacher does not repeat twice
    this.teacherUsers.forEach(item => {
      count = this.teacherFilterCount(this.teacherGroups, item)
      if (count < 2) {
        teachers.push(item)
        count = 0
      }
    })


    const dialogRef = this.dialog.open(DialogUserGroupComponent, {
      width: '750px',
      data: {
        teachers: teachers,
        createGroup: true
      }
    })

    dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result => {
        console.log("dialog responde: ", result);

        var str = ""
        str.substring
        var observable = new Observable(observer => {
          observer.next(3);
          if (result !== null) {
            let teachTime = result.teachingtime.substring(0, 5)

            //CREATE GROUP
            this.createGroup(result.groupname)
            // this.identityService.createGroup({
            //   name: result.groupname,
            //   creationDate: new Date()
            // })
            //   .subscribe(
            //     data => {
            //       console.log("group is sucessfuly created", data);
            //       this.createdGroupId = data.id;
            //     },
            //     error => {
            //       this.openSweetAlertToast('error', error);
            //     })

            //CREATE TEACHER -> GROUP
            setTimeout(() => {
              observer.next(4);
              console.log('groupId',this.createdGroupId)
              this.createTeacherGroup(this.createdGroupId, result.teacher.id, teachTime);
              observer.complete();
            }, 500)

          }
        });

        observable.subscribe({
          next: x => console.log('got value ' + x),
          error: err => console.error('something wrong occurred: ' + err),
          complete: () => console.log('done'),
        });


      })

  }

  createGroup(groupname){
    this.identityService.createGroup({
      name: groupname,
      creationDate: new Date()
    })
      .subscribe(
        data => {
          console.log("group is sucessfuly created", data);
          this.createdGroupId = data.id;
        },
        error => {
          this.alertService.openSweetAlertToast('error', error);
        })

  }
  createTeacherGroup(groupId, teacherId, time) {
    this.identityService.createTeacherGroup({
      teacherId: teacherId,
      groupId: groupId,
      teaching_time: time
    })
      .subscribe(
        data => {
          this.alertService.openSweetAlertToast('success', 'Group is successfully created');
          this.getAllUsers()
        },
        error => {
          this.identityService.deleteGroup(groupId)
          .subscribe( )
          this.alertService.openSweetAlertToast('error', error);
          console.log(error)
        }
      )
  }


  userGroupUpdateDialog(data) {
    var count = 0
    var teachers = []

    this.teacherUsers.forEach(item => {
      count = this.teacherFilterCount(this.teacherGroups, item)
      if (count < 2) {
        teachers.push(item)
        count = 0
      }
    })


    const dialogRef = this.dialog.open(DialogUserGroupComponent, {
      width: '750px',
      data: {
        item: data,
        teachers: teachers,
        updateGroup: true
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

            //Update GROUP
            this.identityService.updateGroup({
              id: data.group.id,
              name: result.groupname,
              creationDate: data.group.creationDate
            })
              .subscribe(
                data => {
                  console.log("group is sucessfuly updated", data);

                },
                error => {
                  this.alertService.openSweetAlertToast('error', error);
                })

            //UPDATE TEACHER -> GROUP
            setTimeout(() => {
              observer.next(4);
              this.identityService.updateTeacherGroup({
                id: data.teacherGroupId,
                teacherId: result.teacherid,
                groupId: data.group.id,
                teaching_time: result.teachingtime
              })
                .subscribe(
                  data => {
                    this.alertService.openSweetAlertToast('success', 'Group is successfully created');
                    this.getAllUsers()

                  },
                  error => {
                    this.alertService.openSweetAlertToast('error', error);
                  })

              observer.complete();
            }, 800)

          }
        });

        observable.subscribe({
          next: x => console.log('got value ' + x),
          error: err => console.error('something wrong occurred: ' + err),
          complete: () => console.log('done'),
        });


      })

  }

  deleteTeacherGroup(data) {
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
        this.identityService.deleteGroup(data.group.id)
          .subscribe(
            data => {
              // this.openSweetAlertToast('success', 'successfully deleted')
              // this.getAllUsers();
              console.log('success: ', 'successfully deleted')
            },
            error => {
              console.log(error)
              this.alertService.openSweetAlert('error', 'Please check your connection')
            }
          )

        this.identityService.deleteTeacherGroup(data.teacherGroupId)
          .subscribe(
            data => {
              this.alertService.openSweetAlertToast('success', 'successfully deleted')

              this.getAllUsers();
            },
            error => {
              this.alertService.openSweetAlert('error', 'Please check your connection')
            }
          )


      }
    })
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


 

  // confirmDeleteAlert() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {

  //     if (result.value) {
  //       // Swal.fire(
  //       //   'Deleted!',
  //       //   'Your file has been deleted.',
  //       //   'success',

  //       // )

  //     }
  //   })


  // }


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

}
