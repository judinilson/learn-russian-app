import { ContentModule } from './pages/content/content.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageModule } from './pages/dashboard/dashboard';
import { HelpComponent } from './pages/help/help';
import { TrainingTestModule } from './pages/test/training-test.module';
import {StatisticModule} from './pages/statistic/statistic.component';
import {  OAuthModule } from './shared/Aouth/Aouth.module';
import { AdminDashboardModule } from './pages/Admin-dashboard/admin-dashboard.Module';
import { environment, firebaseConfig } from './shared/environment';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    
  ],
  imports: [
    OAuthModule,
    BrowserModule,
    AppRoutingModule,
    DashboardPageModule,
    BrowserAnimationsModule,
    ContentModule,
    TrainingTestModule,
    StatisticModule,
    AdminDashboardModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    
    ],
  providers: [AngularFireStorage],
  bootstrap: [AppComponent],
  
  
})
export class AppModule { }
