import { HelpComponent } from './pages/help/help';
import { ContentTextsComponent } from './pages/content/content-texts/content-texts';
import { ContentDemoComponent } from './pages/content/content-demo/content-demo';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { TestComponent } from './pages/test/test.component';
import {QuestionsAnswersComponent} from './pages/test/questions-answers/questions-answers.component'
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoDemoComponent } from './pages/content/content-demo/video-demo/video-demo.component';
import { ArticleContentComponent } from './pages/content/content-texts/article-content/article-content.component';
import { Congratulation } from './pages/test/congratulation-page/congratulation';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'content-demo', component: ContentDemoComponent },
  {path: 'visual-demo', component: VideoDemoComponent},
  { path: 'content-text', component: ContentTextsComponent },
  {path: 'visual-article', component: ArticleContentComponent},
  { path: 'test', component: TestComponent },
  { path: 'training', component: QuestionsAnswersComponent },
  { path: 'rate-test', component: Congratulation },
  {path: 'statistic', component: StatisticComponent },
  {path: 'help', component: HelpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
