import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor, } from './helper/error.interceptor';
import { CommonModule } from '@angular/common';
import { MdcButtonModule, 
  MdcFabModule, 
  MdcIconModule,
   MdcCardModule, 
   MdcTopAppBarModule, 
   MdcSelectModule, 
   MdcCheckboxModule, 
   MdcFormFieldModule} from '@angular-mdc/web';
   import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  lock_user_icon:string;
  footer_td: Date = new Date();
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }

    
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
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
              });
  }

}


@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    

    //mdc
    MdcButtonModule,
    MdcFabModule,
    MdcIconModule,
    MdcCardModule,
    MdcTopAppBarModule,
    MdcSelectModule,
    MdcCheckboxModule,
    MdcFormFieldModule
  ],
  exports: [OauthComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService
  ],
  declarations: [OauthComponent],
})
export class OauthModule { }


