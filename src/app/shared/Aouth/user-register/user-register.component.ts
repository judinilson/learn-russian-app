import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  disabled = true

  showDetails:boolean
  //strength type (weak , normal, strong)
  strengthType:string;

  // hide password
  hide = true

  isCollapsed = true;

  // password polices 
  @Input()
  password: string; // the provided password to be processed as string

  /* Object.Keys()
  Object that contains the properties and methods. 
  This can be an object that you created or 
  an existing (DOM) object.
    Returns the names of the enumerable
    string properties and methods of an object.
  */
  @Input()
  validators: Criteria[] = Object.keys(Criteria).map(key => Criteria[key]) // array of criteria

  @Input()
  externalError:boolean; // trigger to change the state of the password strength if an external error occurs

  //@Output()
  // event emiter that will  be fired every time the state of the password strength changes (0 to 100%)
  //onStrengthChanged: EventEmitter<number>= new EventEmitter<number>() 

  //map the criteria and Regex 
  criteriaMap = new Map<Criteria, RegExp>()

  //the criteria with type
  containAtLeastEightChars:boolean;
  containAtLeastOneLowerCaseLetter:boolean;
  containAtLeastOneUpperCaseLetter:boolean;
  containAtLeastOneDigit:boolean;
  containALeastOneSpecialChar:boolean;

  //abstract control
//   passwordFormControl:AbstractControl;

  //password strength
  private _strength: number;

  //color of animation 
  private _color: string;

  
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


      //set criteries and regex to MapCriteria
      // for every criteria, test the password against a regular expression
      this.criteriaMap.set(Criteria.at_least_eight_chars,RegExp(/^.{8,63}$/))
      this.criteriaMap.set(Criteria.at_least_one_lowerCase_char,RegExp(/^(?=.*?[a-z])/))
      this.criteriaMap.set(Criteria.at_least_one_upperCase_char,RegExp(/^(?=.*?[A-Z])/))
      this.criteriaMap.set(Criteria.at_least_one_upperCase_char,RegExp(/^(?=.*?[0-9])/))
      this.criteriaMap.set(Criteria.at_least_one_upperCase_char,RegExp(/^(?=.*?[ " !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~" ])/))
    
  }

   ngOnInit() {
     this.isCollapsed = true; 
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
          password: ['', [...this.validators.map(criteria => Validators.pattern(this.criteriaMap.get(criteria)))]],
          country: [null,[Validators.required]],
          groupteacher: [null,[Validators.required]],
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
      this.userGetIcon();
      
  }


  // every time the password changes, the strength will be calculated and emitted 
  ngOnChanges(changes: SimpleChanges): void {
      //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
      //Add '${implements OnChanges}' to the class.
      if(changes.externalError && changes.externalError.firstChange){
          this._color = Colors.primary;
          return;
      }
      if(changes.externalError && changes.externalError.currentValue){
          this._color = Colors.accent;
          return;
      }
      
      this.password && this.password.length > 0 ? this.calculatePasswordStrength(): this.reset();
  }


  // getting strength if exist or not null (if isn't then set to 0 else get strength)
  get strength(): number{
      return this._strength ? this._strength : 0;
  }


  // getting the color for each strength 
  // using the value of strength to pick right color 
  get color():string{

      if(this._strength <= 20){
          this.strengthType = 'Weak'
          return Colors.warn;
      }else if(this._strength <= 80){
        this.strengthType = 'Normal'
         return Colors.accent;
      }else{
        this.strengthType = 'Strong'
          return Colors.primary
      }
  }




  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  //icon
  private userGetIcon(){
    this.lock_user_icon = "https://img.icons8.com/bubbles/100/000000/lock-male-user.png";
  }




  
  // create new user on submiting the user data
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

  //register new user country
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

  //register new user
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
        this.identityService.studentUserCreate(
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

  //get countries from api
  getCountries(){
        this.countries = new Array();
      let index_ = new Array();
         this.allCountries.forEach((el,index) => {
    
            var country = {name: el.name, language: el.languages[0].name,region: el.region}
            this.countries.push(country);
            index_.push(index)
        });
      
  }

  //get the school group in api
  getUserGroup(data:any){
    this.groups = data
  }

  // get the teachers with groups from api
  getTeacherGroup(data:any){
     this.teacherGroups = data;
     console.log(this.teacherGroups);
  }

  
  //alert
  alertClose() {
    this.alert = new BehaviorSubject<boolean>(false);;
      
  }


  // password police criteria methods 
  private _containAtLeastEightChars(): boolean{
      // checking if the criteria of 8 char is true in password
      this.containAtLeastEightChars = this.password.length >= 8;
      // if the password is >= 8 then return true else return false 
      return this.containAtLeastEightChars 
  }

  private _containAtLeastLowerCaseLetter(): boolean{
      this.containAtLeastOneLowerCaseLetter = 
      // geting the enum (Criteria.at_least_one_lowerCase_char) from the map,that map it with [a-z] RegexExp 
       //and test it with password. 
      //if password have at least lower case
            this.criteriaMap
                .get(Criteria.at_least_one_lowerCase_char) 
                .test(this.password)

    return this.containAtLeastOneLowerCaseLetter //if exist or contain return true else false 
  }

  private _containAtLeastUpperCaseLetter():boolean{
    // geting the enum (Criteria.at_least_one_upperCase_char) from the map,that map it with [A-Z] RegexExp 
       //and test it with password. 
      //if password have at least upper case

      this.containAtLeastOneUpperCaseLetter = 
            this.criteriaMap
                .get(Criteria.at_least_one_upperCase_char) 
                .test(this.password)

    return this.containAtLeastOneUpperCaseLetter //if exist or contain return true else false 
  }

  private _containAtLeastOneDigit():boolean{
    // geting the enum (Criteria.at_least_one_digit_char) from the map,that map it with [0-9] RegexExp 
       //and test it with password. 
      //if password have at least one digit

      this.containAtLeastOneDigit = 
            this.criteriaMap
                .get(Criteria.at_least_one_digit_char) 
                .test(this.password)

    return this.containAtLeastOneDigit //if exist or contain return true else false 
  }

  private _containAtLeastOneSpecialChar():boolean{
    // geting the enum (Criteria.at_least_one_special_car) from the map,that map it with [!@#$%^&*()_+=-] RegexExp 
       //and test it with password. 
      //if password have at least one special char

      this.containALeastOneSpecialChar = 
            this.criteriaMap
                .get(Criteria.at_least_one_special_car) 
                .test(this.password)

    return this.containALeastOneSpecialChar //if exist or contain return true else false 
  }

  // calculating password strength
  calculatePasswordStrength(){
      const requirements: Array<boolean>=[];
      const unit = 100/5 // 100% div by 5 requirements

      // creating boolean array of requirements methods that return if is contain or not (true or false)
      requirements.push(
          this._containAtLeastEightChars(),
          this._containAtLeastLowerCaseLetter(),
          this._containAtLeastUpperCaseLetter(),
          this._containAtLeastOneDigit(),
          this._containAtLeastOneSpecialChar(),
      )

      // filtering requirement that will return the trues requirement length and mult with unit
      // that mean if filter 2 or 3 or 4 requirement that is true it will be multiplied by unit Ex(4 * 20)
      this._strength = requirements.filter(v => v).length * unit;
      // watching if the strength change and to emit the change to strength method that will get _strength
      //this.onStrengthChanged.emit(this.strength) 

  }

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);

    if(strength <= 20){
        this.strengthType = 'Weak'
        this.showDetails = true
    }else if(strength <= 80){
      this.strengthType = 'Normal'
    }else{
      this.strengthType = 'Strong'
    }
  }

  // reset all requirement and strength by equalizing to zero
  reset(){
      this._strength = 0
      this.containAtLeastOneLowerCaseLetter = 
        this.containAtLeastOneUpperCaseLetter = 
            this.containALeastOneSpecialChar = 
                this.containAtLeastEightChars = 
                    this.containAtLeastOneDigit = false;
  }

  

}


export interface CountryApi{
    name: string ;
    language: string;
    region: string;
}

// represent the state of the password's strength
export enum Colors{
    primary = 'primary', // is strong enough
    accent = 'accent', // is ok
    warn = 'warn' // not strong enough
}

export enum Criteria{
    at_least_eight_chars,
    at_least_one_lowerCase_char,
    at_least_one_upperCase_char,
    at_least_one_digit_char,
    at_least_one_special_car,
}