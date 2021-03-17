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
import { OauthComponent } from './shared/Aouth/Auth/oauth.component';
import { AuthGuard } from './shared/helper/auth.guard';
import { UserRegisterComponent } from './shared/Aouth/user-register/user-register.component';
import { UserProfilComponent } from './shared/Aouth/user-profil/user-profil.component';
import { AdminLayoutComponent } from './pages/Admin-dashboard/components/layouts/admin-layout.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'content-demo', component: ContentDemoComponent },
  { path: 'visual-demo', component: VideoDemoComponent},
  { path: 'content-text', component: ContentTextsComponent },
  { path: 'visual-article', component: ArticleContentComponent},
  { path: 'login', component: OauthComponent},
  { path: 'subscribe', component: UserRegisterComponent},
  { path: 'user-profile', component: UserProfilComponent,canActivate: [AuthGuard]},
  { path: 'test', component: TestComponent, canActivate: [AuthGuard]},
  { path: 'training', component: QuestionsAnswersComponent, canActivate: [AuthGuard] },
  { path: 'rate-test', component: Congratulation,canActivate: [AuthGuard] },
  { path: 'statistic', component: StatisticComponent,canActivate: [AuthGuard] },
  { path: 'help', component: HelpComponent,canActivate: [AuthGuard] },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Admin-dashboard/admin-dashboard.Module').then(m => m.AdminDashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
