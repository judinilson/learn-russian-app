import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageModule } from './pages/dashboard/dashboard';
import { ContentDemoComponent } from './pages/content-demo/content-demo.component';
import { TestComponent } from './pages/test/test.component';
import { StatisticComponent } from './pages/statistic/statistic.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentDemoComponent,
    TestComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardPageModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
