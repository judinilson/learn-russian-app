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
import { TrainingTestService } from 'src/app/shared/service/training-test-service';
//import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  totalCorrectAnswers = 0
  totalIncorrectAnswers = 0
  correctAnswerPercentage = 0
  incorrectAnswerPercentage = 0
  totalAnswers = 0
  trainingDataResult: any;
  tDate = ''
  statistics = false

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
  currentTrainingTestIndex: boolean;
  continueTestAlert: boolean;
  visitedContentPage = 0;
  constructor(
    private trainingTestService: TrainingTestService,
  ) { }

  ngOnInit() {
    
    
    this.trainingDataResult = JSON.parse(localStorage.getItem('trainingDataResult'));
    if (this.trainingDataResult !== null) {
     

      //geting last traing data from localstorage if none new training has  being set
      this.totalCorrectAnswers = this.trainingDataResult.totalCorrectAnswers,
      this.totalIncorrectAnswers = this.trainingDataResult.totalIncorrectAnswers,
      this.totalAnswers = this.trainingDataResult.totalAnswers
      this.statistics = !this.statistics
    }
    
   if( 
       this.currentTrainingTestIndex = JSON.parse(localStorage.getItem('currentTestIndex')) !== null
     )this.continueTestAlert = true;
    
     //how many times user visited content page 
    this.countTimesUservisitContentPage()

    this._calculatePercent();
    this.getNewDate();

    if(this.rating <= 2){
      this.emoji = "../../../assets/emojis/emoji-1.png"
    }else if (this.rating === 3) {
      this.emoji = "../../../assets/emojis/emoji-2.png"
    } else if(this.rating === 4) {
      this.emoji = "../../../assets/emojis/emoji-3.png"
    }else {
      this.emoji = "../../../assets/emojis/emoji-4.png"
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

  _calculatePercent(){
    this.correctAnswerPercentage = Math.round(this.totalCorrectAnswers * 100 / this.totalAnswers )
    this.incorrectAnswerPercentage = Math.round(this.totalIncorrectAnswers * 100 /  this.totalAnswers)

    this.calculateRating(this.correctAnswerPercentage)
  }


  getNewDate(){
    var tDate = new Date()
    var dd = String(tDate.getDate()).padStart(2, '0');
    var mm = String(tDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = tDate.getFullYear();

    this.tDate = mm + '/' + dd + '/' + yyyy;
  }


  
  // Оценка 5 = 90%-100%
  // Оценка 4 = 80%-90%
  // Оценка 3 = 70%-80%
  // Оценка 2 = 60%-70%
  // Оценка 1 = 0%-60%


  calculateRating(correctAnswerPercentage){
    if(correctAnswerPercentage >= 0 && correctAnswerPercentage <= 60 ) this.rating = 1
    else if(correctAnswerPercentage > 60 && correctAnswerPercentage <= 70) this.rating = 2
    else if(correctAnswerPercentage > 70 && correctAnswerPercentage <= 80) this.rating = 3
    else if(correctAnswerPercentage > 80 && correctAnswerPercentage <= 90) this.rating = 4
    else this.rating = 5
  }


  countTimesUservisitContentPage(){
    var visited = JSON.parse(localStorage.getItem('userVisited'))
    if(visited !== null){
      this.visitedContentPage = visited.user_visited_content
    }
    
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

