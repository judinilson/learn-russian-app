import { HelpComponent } from './pages/help/help';
import { ContentTextsComponent } from './pages/content-texts/content-texts';
import { ContentDemoComponent } from './pages/content-demo/content-demo';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { TestComponent } from './pages/test/test.component';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'content-demo', component: ContentDemoComponent },
  { path: 'content-text', component: ContentTextsComponent },
  { path: 'test', component: TestComponent },
  {path: 'statistic', component: StatisticComponent },
  {path: 'help', component: HelpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
