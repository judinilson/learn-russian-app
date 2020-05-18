import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { IdentityService } from '../../service/identity.service';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import {AuthenticationService} from '../../service/authentication.service'
import { Role } from '../../Model/role';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {
  updateForm: FormGroup;
  footer_td: Date = new Date();
  user: any;
  firstname: any;
  lastname: any;
  username: any;
  password: any;
  role: Role;
  userId: Number;
  loading = false;
  submitted = false;
  wrongPassword = false;

  alert = new Observable<boolean>();
  error = '';
  unknowneror: boolean;
  UpdatedUser: any;
  isTeacher: boolean;
  isStudent: boolean;
  isAdmin: boolean;
  invalidForm: boolean;





  constructor(
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    if (localStorage.getItem('currentUser') !== null) {
      this.user = JSON.parse(window.localStorage.getItem('currentUser'));
      this.firstname = this.user.firstName;
      this.lastname = this.user.lastName;
      this.username = this.user.username;
      this.password = this.user.password;
      this.userId = this.user.id;
      this.getUserRole(this.user.role);
      console.log(this.role);
    }

    this.updateForm = this.formBuilder.group({
      firstname: [null],
      lastname: [null],
      username: [null],
      oldpassword: ['', [Validators.required, Validators.minLength(8)]],
      newpassword: ['', [Validators.minLength(8)]]

    });

    console.log(this.userId);
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) 
    {
      console.log('invalid form');
      
    }

    if(this.f.firstname.value === null && this.f.lastname.value === null 
      && this.f.username.value === null && this.f.newpassword.value === '')
      {
        this.alert = new BehaviorSubject<boolean>(true);
        this.invalidForm = true;
        setTimeout(() => {
          this.alertClose();
        }, 6000);
        return;
      }

    if (this.password !== this.f.oldpassword.value) {
      console.log('wrong password');
      this.alert = new BehaviorSubject<boolean>(true);
      this.wrongPassword = true
      if (this.alert) {
        setTimeout(() => {
          this.alertClose();
        }, 6000);
      }
      return
    }
    
    this.loading = true;

    if(this.f.firstname.value !== null) this.firstname = this.f.firstname.value;
    if(this.f.lastname.value !== null) this.lastname = this.f.lastname.value;
    if(this.f.username.value !== null) this.username = this.f.username.value;
    if(this.f.newpassword.value !== '') this.password = this.f.newpassword.value;

    if(this.userId === undefined){
      console.log(this.userId);
      return
    }

    this.identityService.userUpdate(this.userId,
      {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        password: this.password
      }
    )
    .pipe(debounceTime(500))
    .pipe(distinctUntilChanged())
    .subscribe(
      data =>{
        console.log('updated sucessfully');
        this.loading = false;
          console.log('sucess trying get data of user ');
          this.delay(5000);
          if(this.userId !== null){

          this.authenticationService.login(this.username, this.password)
          .pipe(first())
          .subscribe(
              user => {
                console.log(user);
                this.getUpdateUser(user);
              },
              error => {
                console.log('put error: '+ error);
                });

          }
             
        },
      error =>{
        this.error = error;
        this.loading = false;
        this.alert = new BehaviorSubject<boolean>(true);
        if(this.error.substr(0,7) ==='Unknown') this.unknowneror = true;
      });

     

    if (this.alert) {
      setTimeout(() => {
        this.alertClose();
      }, 6000);
    }
  }


  getUpdateUser(user){
    this.UpdatedUser = JSON.parse(window.localStorage.getItem('currentUser'));
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.reload();

  }

  alertClose() {
    this.alert = new BehaviorSubject<boolean>(false);;
  }


  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  getUserRole(role){
    if(role === 1) this.isTeacher = true;
    if(role === 2) this.isStudent = true;
    if(role === 3) this.isAdmin = true;
  }


  public logOut(){
    this.authenticationService.logout();
  }
  
}
