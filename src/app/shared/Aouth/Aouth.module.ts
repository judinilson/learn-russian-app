import {  NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../helper/jwt.interceptor';
import { ErrorInterceptor, } from '../helper/error.interceptor';

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
    exports: [OauthComponent,UserRegisterComponent],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      AuthenticationService
    ],
    declarations: [OauthComponent,UserRegisterComponent, UserProfilComponent],
  })
  export class OAuthModule { }