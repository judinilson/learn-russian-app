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
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ChartsModule, Color } from 'ng2-charts';
import { Label } from 'ng2-charts';
import { TrainingTestService } from 'src/app/shared/service/training-test.service';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';


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

  incorrectCharData = []
  correctCharData = []
  dateTimeCharData: Date[] = []

  statisticData: any;

  querryProgressBar = true;
  notnetwork = false

  rating = 4;
  emoji = ""
  enum = '../../../assets/icons/russia.png'

  currentTrainingTestIndex: boolean;
  continueTestAlert: boolean;
  visitedContentPage = 0;
  currentUser: any;

  //char
  barCharOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          //steps: 10,
          beginAtZero: true,
          stepSize: 5,
          min: 0,
          max: 100
        }
      }]
    },
    maintainAspectRatio: false
  }

  barChartLabels: Label[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Правильный' },
    { data: [], label: 'Неправильный' }
  ]

  chartColors: Color[] = [
    {
      backgroundColor: '#28a745',
      borderColor: 'green'
    },
    {
      backgroundColor: '#dc3545',
      borderColor: 'red'
    }

  ]

 

//
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


    //continue training alert
    if (
      this.currentTrainingTestIndex = JSON.parse(localStorage.getItem('currentTestIndex')) !== null
    ) this.continueTestAlert = true;


    this.getStatistics();

    //how many times user visited content page 
    this.countTimesUservisitContentPage()

    this._calculatePercent();
    this.getNewDate();

    this.userRating();

  }

  
//http request
  getStatistics() {
    this.trainingTestService.getStatistic()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          this.statisticData = data
          this.charData(data)
          this.querryProgressBar = false
        },
        error => {
          console.log("Error while getting statistic data!!", error);
          this.notnetwork = true;

        }
      )
  }

  

  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }

  charData(data) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (this.currentUser !== null && data !== null) {
      var currentUserStatistic = data.filter(x => x.userId === this.currentUser.id).slice(-6)
      currentUserStatistic.forEach(item => {
        this.correctCharData.push(item.percentageCorrectAnswers)
        this.incorrectCharData.push(item.percentageIncorrectAnswers)
        this.dateTimeCharData.push(new Date(item.trainingDate))

      })

      //weekDay
      this.dateTimeCharData.forEach((x, i) => {
        if (x.getDay() === 1) {//monday
          this.barChartData[0].data[0] = this.correctCharData[i]
          this.barChartData[1].data[0] = this.incorrectCharData[i]
        }

        if (x.getDay() === 2) {//tuesday
          this.barChartData[0].data[1] = this.correctCharData[i]
          this.barChartData[1].data[1] = this.incorrectCharData[i]
        }

        if (x.getDay() === 3) {//wednesday
          this.barChartData[0].data[2] = this.correctCharData[i]
          this.barChartData[1].data[2] = this.incorrectCharData[i]
        }

        if (x.getDay() === 4) {//thursday
          this.barChartData[0].data[3] = this.correctCharData[i]
          this.barChartData[1].data[3] = this.incorrectCharData[i]
        }

        if (x.getDay() === 5) {//friday
          console.log(this.correctCharData[i], this.incorrectCharData[i]);

          this.barChartData[0].data[4] = this.correctCharData[i]
          this.barChartData[1].data[4] = this.incorrectCharData[i]

        }

        if (x.getDay() === 6) {//saturday
          this.barChartData[0].data[5] = this.correctCharData[i]
          this.barChartData[1].data[5] = this.incorrectCharData[i]
        }
      })
    }
  }


  randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  _calculatePercent() {
    this.correctAnswerPercentage = Math.round(this.totalCorrectAnswers * 100 / this.totalAnswers)
    this.incorrectAnswerPercentage = Math.round(this.totalIncorrectAnswers * 100 / this.totalAnswers)

    this.calculateRating(this.correctAnswerPercentage)
  }

  userRating() {
    if (this.rating <= 2) {
      this.emoji = "../../../assets/emojis/emoji-1.png"
    } else if (this.rating === 3) {
      this.emoji = "../../../assets/emojis/emoji-2.png"
    } else if (this.rating === 4) {
      this.emoji = "../../../assets/emojis/emoji-3.png"
    } else {
      this.emoji = "../../../assets/emojis/emoji-4.png"
    }
  }


  getNewDate() {
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


  calculateRating(correctAnswerPercentage) {
    if (correctAnswerPercentage >= 0 && correctAnswerPercentage <= 60) this.rating = 1
    else if (correctAnswerPercentage > 60 && correctAnswerPercentage <= 70) this.rating = 2
    else if (correctAnswerPercentage > 70 && correctAnswerPercentage <= 80) this.rating = 3
    else if (correctAnswerPercentage > 80 && correctAnswerPercentage <= 90) this.rating = 4
    else this.rating = 5
  }


  countTimesUservisitContentPage() {
    var visited = JSON.parse(localStorage.getItem('userVisited'))
    if (visited !== null) {
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

