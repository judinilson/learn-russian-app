import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  MdcSelectModule,
  MdcTopAppBarModule,
  MdcDrawerModule,
  MdcCardModule,
  MdcButtonModule,
  MdcFabModule,
  MdcIconModule,
  MdcMenuModule,
  MdcListModule,
} from '@angular-mdc/web';
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
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from 'src/app/shared/service/dataService';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SideNavPageModule } from 'src/app/shared/side-nav/side-nav.component';
import {ChartOptions,ChartType,ChartDataSets} from 'chart.js';
import { ChartsModule, Color } from 'ng2-charts';
import {Label}from 'ng2-charts';
//import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  rating = 4;
  emoji = ""
  enum = '../../../assets/icons/russia.png'
  barCharOptions: ChartOptions  ={
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
            //steps: 10,
            beginAtZero: true,
            stepSize : 5,
            min: 0,
            max: 100
          } 
      }]
    },
   maintainAspectRatio: false
  }

   barChartLabels: Label[] = ['Пн','Вт','Ср','Чт','Пт','Сб']
   barChartType: ChartType = 'bar';
   barChartLegend = true;
  
   barChartData: ChartDataSets[] =[
    {data: [3,42,56,67,33,59],label: 'Incorrect'},
    {data: [78,48,40,19,86,99],label: 'Correct'}
  ]

  chartColors: Color[]=[
    {
      backgroundColor:'#dc3545',
      borderColor:'red'
    },
    {
      backgroundColor: '#28a745',
      borderColor:'green'
    }
  ]
  constructor() { }

  ngOnInit() {
    


    if(this.rating <= 2){
      this.emoji = "https://img.icons8.com/color/48/000000/crying--v1.png"
    }else if (this.rating === 3) {
      this.emoji = "https://img.icons8.com/color/48/000000/anime-emoji.png"
    } else if(this.rating === 4) {
      this.emoji = "https://img.icons8.com/color/48/000000/fat-emoji.png"
    }else {
      this.emoji = "https://img.icons8.com/color/48/000000/in-love.png"
    }
  }


  chartClicked({event,active}:{event:MouseEvent, active:{}[]}):void{
    console.log(event,active);
  }
  chartHovered({event,active}:{event:MouseEvent,active:{}[]}): void{

  }

  randomize():void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  
}

//const Percent = 100 / (obj.length - 1); // how many percent each file represents.


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
    MatSelectModule,

    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SideNavPageModule,
    ChartsModule,

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
  exports: [StatisticComponent],
  providers: [DataService],
  declarations: [StatisticComponent],
})
export class StatisticModule { }

