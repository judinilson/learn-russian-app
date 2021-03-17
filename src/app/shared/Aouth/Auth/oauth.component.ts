import { Component, OnInit, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';




@Component({
  selector: 'app-oauth', 
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']  
})

export class OauthComponent implements OnInit {

    @ViewChild('alertbtn',{static: false}) alertbtn: ElementRef;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  unknowneror = false;
  lock_user_icon:string;
  footer_td: Date = new Date();
  alert = new Observable<boolean>();
  alerts = null;
  isCollapsed = true;


  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }

    
  }

  ngOnInit() {

    this.isCollapsed = true;
    
      this.loginForm = this.formBuilder.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required,Validators.minLength(8)]]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.userGetIcon();
      
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  private userGetIcon(){
    this.lock_user_icon = "https://img.icons8.com/bubbles/100/000000/lock-male-user.png";
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.error = error;
                  this.loading = false;
                  this.alert = new BehaviorSubject<boolean>(true);
                  if(this.error.substr(0,7) ==='Unknown') this.unknowneror = true;
                  console.log(this.error.substr(1,7));
                 });


    if(this.alert){
        setTimeout(() => {
            this.alertClose();  
       }, 6000);
    }
  
  }


 

  alertClose() {
    this.alert = new BehaviorSubject<boolean>(false);;
      
  }


}




