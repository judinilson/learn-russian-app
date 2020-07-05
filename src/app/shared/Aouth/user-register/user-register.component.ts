import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first, debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import {IdentityService} from '../../service/identity.service'
import { TeacherGroup } from '../../Model/Teacher-Group';
import {Role} from '../../Model/role'
import { Country } from '../../Model/Country-create';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;
  teacherGroups: any;
  groups:any;
  allCountries: any;
  countries:CountryApi[];
  country:any;
  countryId = 0;
  role: Role.Student;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  lock_user_icon:string;
  footer_td: Date = new Date();
  alert = new Observable<boolean>();

  
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private identityService: IdentityService,
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }

    
  }

   ngOnInit() {
      this.identityService.teacherGroupGet().subscribe(teachersdt => {
          this.getTeacherGroup(teachersdt)
      });

      this.identityService.UserGroupGet().subscribe(data => {
        this.getUserGroup(data);
    });

      this.identityService.geCountries().subscribe(allCountriesdata =>{
          this.allCountries = allCountriesdata
          this.getCountries();
      })


      
      this.registerForm = this.formBuilder.group({
          firstname: ['',[Validators.required]],
          lastname: ['',[Validators.required]],
          username: ['', [Validators.required]],
          password: ['', [Validators.required,Validators.minLength(8)]],
          country: [null,[Validators.required]],
          groupteacher: [null,[Validators.required]],
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
      this.userGetIcon();
      
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  private userGetIcon(){
    this.lock_user_icon = "https://img.icons8.com/bubbles/100/000000/lock-male-user.png";
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;

      var observable = new Observable( observer => {
        observer.next(3);
        this.createCountry();
        setTimeout(() => {
          observer.next(4);
          this.createUser();
          observer.complete();
        }, 6000)
      });

        //console.log('just before subscribe');
        observable.subscribe({
            next: x => console.log('got value ' + x),
            error: err => console.error('something wrong occurred: ' + err),
            complete: () => console.log('done'),
        });
        //console.log('just after subscribe');




  }

  private createCountry(){
    this.identityService.countryCreate(
        {
        name: this.f.country.value.name,
        language: this.f.country.value.language,
        region: this.f.country.value.region, 
        })
    .pipe(debounceTime(500))
    .pipe(distinctUntilChanged())
    .subscribe(
        res => {
            this.country = res
            this.countryId = this.country.id

        },
        error =>{
            this.error = error;
            this.loading = false;
            this.alert = new BehaviorSubject<boolean>(true);
          
        }
    );
  

  }

 private createUser(){

    let idgroup = null;
    let tgroup = null;
    if(this.teacherGroups != undefined){
        let tgroupId = this.f.groupteacher.value.id; //get id of group
        tgroup = this.teacherGroups.filter(tg => tg.groupId == tgroupId); //filter the groups tha have teachers releted to that group id
        idgroup = tgroup[0].id; //id selected teacher group
    } else{
        console.log('group is unselected');
    }

    if(idgroup != null && this.countryId != 0){

        console.log("country ID:",this.countryId)
        this.identityService.userCreate(
            {
                firstname: this.f.firstname.value, 
                lastname: this.f.lastname.value,
                username: this.f.username.value,
                countryId: this.countryId,
                teacherGroupId: idgroup,
                password: this.f.password.value,
                role: this.role,
                created: new Date(),
            })
            .pipe(delay(800))
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);

                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.alert = new BehaviorSubject<boolean>(true);
                    console.log("error trying to subscribe user: ",error)
                    });   
      
    }else{
        console.log('group id cannot be null',this.error);
    }

    if(this.alert){
        setTimeout(() => {
            this.alertClose();  
       }, 6000);
    }
  }

  getCountries(){
        this.countries = new Array();
      let index_ = new Array();
         this.allCountries.forEach((el,index) => {
    
            var country = {name: el.name, language: el.languages[0].name,region: el.region}
            this.countries.push(country);
            index_.push(index)
        });
      
  }

  getUserGroup(data:any){
    this.groups = data
  }

  getTeacherGroup(data:any){
     this.teacherGroups = data;
     console.log(this.teacherGroups);
  }

  
  alertClose() {
    this.alert = new BehaviorSubject<boolean>(false);;
      
  }


}


export interface CountryApi{
    name: string ;
    language: string;
    region: string;
}