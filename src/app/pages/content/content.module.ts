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
import { 
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule, 
    MatOptionModule ,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule

} from '@angular/material';


// videogular
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';

import {
        MdcButtonModule,
        MdcFabModule,
        MdcIconModule,
        MdcDrawerModule,
        MdcMenuModule,
        MdcListModule,
        MdcCardModule,
        MdcTopAppBarModule,
        MdcSelectModule,
    } from '@angular-mdc/web';
import { VideoDemoComponent } from './content-demo/video-demo/video-demo.component';
import { ContentService } from 'src/app/shared/service/content.service';
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
        MatSidenavModule,

        CommonModule,
        FlexLayoutModule,
        RouterModule,
        ReactiveFormsModule, 
        FormsModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
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
    providers: [ContentService,DataService],
    // tslint:disable-next-line:max-line-length
    declarations: [ContentDemoComponent, ContentTextsComponent, VideoDemoComponent, ArticleContentComponent],
})
export class ContentModule { }
