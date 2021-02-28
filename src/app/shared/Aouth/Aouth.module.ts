import {  NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../helper/jwt.interceptor';
import { ErrorInterceptor, } from '../helper/error.interceptor';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';


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
import { OauthComponent } from './Auth/oauth.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
    imports: [
      MatPasswordStrengthModule.forRoot(),
      HttpClientModule,
      ReactiveFormsModule,
      CommonModule,
      RouterModule,
      NgbCollapseModule,
      MatProgressBarModule,
      FormsModule,
      MatFormFieldModule,
      MatButtonModule,
      MatIconModule,
      
  
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
    exports: [OauthComponent,UserRegisterComponent],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      AuthenticationService
    ],
    declarations: [OauthComponent,UserRegisterComponent, UserProfilComponent],
  })
  export class OAuthModule { }