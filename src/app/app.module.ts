import { ContentModule } from './pages/content/content.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageModule } from './pages/dashboard/dashboard';
import { ContentDemoComponent } from './pages/content/content-demo/content-demo';
import { ContentTextsComponent } from './pages/content/content-texts/content-texts';
import { HelpComponent } from './pages/help/help';
import { TrainingTestModule } from './pages/test/training-test.module';
import {StatisticModule} from './pages/statistic/statistic.component'

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardPageModule,
    BrowserAnimationsModule,
    ContentModule,
    TrainingTestModule,
    StatisticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
