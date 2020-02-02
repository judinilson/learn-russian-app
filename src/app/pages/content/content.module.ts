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
    MatOptionModule,
    MatDialogModule,
    MatProgressBarModule } from '@angular/material';

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
    // tslint:disable-next-line:max-line-length
    declarations: [ContentDemoComponent, ContentTextsComponent, VideoDemoComponent],
})
export class ContentModule { }
