import { CommonModule } from '@angular/common';
import{ReactiveFormsModule, FormsModule} from '@angular/forms'
import { SideNavPageModule } from './../../shared/side-nav/side-nav.component';
import { ContentTextsComponent } from './content-texts/content-texts';
import { ContentDemoComponent } from './content-demo/content-demo';
import { NgModule } from '@angular/core';
import { MatVideoModule } from 'mat-video';
import {FlexLayoutModule} from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

import {
        MdcButtonModule,
        MdcFabModule,
        MdcIconModule,
        MdcDrawerModule,
        MdcMenuModule,
        MdcListModule,
        MdcCardModule,
        MdcTopAppBarModule,
        MdcSelectModule
    } from '@angular-mdc/web';
import { VideoDemoComponent } from './content-demo/video-demo/video-demo.component';
import { DemoService } from 'src/app/shared/service/content-demo-service';
import { ArticleContentComponent } from './content-texts/article-content/article-content.component';
import { DataService } from 'src/app/shared/service/dataService';

@NgModule({
    imports: [
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatRippleModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        MatOptionModule,
        MatDialogModule,
        SideNavPageModule,
        MatVideoModule,
        MatSelectModule,

        CommonModule,
        FlexLayoutModule,
        RouterModule,
        ReactiveFormsModule, 
        FormsModule,
//mdc
        MdcButtonModule,
        MdcFabModule,
        MdcIconModule,
        MdcMenuModule,
        MdcListModule,
        MdcCardModule,
        MdcTopAppBarModule,
        MdcDrawerModule,
        MdcSelectModule,
    ],
    exports: [ContentDemoComponent, ContentTextsComponent],
    providers: [DemoService,DataService],
    // tslint:disable-next-line:max-line-length
    declarations: [ContentDemoComponent, ContentTextsComponent, VideoDemoComponent, ArticleContentComponent],
})
export class ContentModule { }
