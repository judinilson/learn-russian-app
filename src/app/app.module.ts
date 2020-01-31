import { ContentModule } from './pages/content/content.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageModule } from './pages/dashboard/dashboard';
import { ContentDemoComponent } from './pages/content/content-demo/content-demo';
import { TestComponent } from './pages/test/test.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { ContentTextsComponent } from './pages/content/content-texts/content-texts';
import { HelpComponent } from './pages/help/help';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    StatisticComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardPageModule,
    BrowserAnimationsModule,
    ContentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
