import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { AdminDashboardService } from 'src/app/shared/service/admin-dashboard.service';
import { IdentityService } from 'src/app/shared/service/identity.service';
import { ContentService } from 'src/app/shared/service/content.service';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { TrainingTestService } from 'src/app/shared/service/training-test.service';
import { DialogCategoryComponent } from './category-dialog/category-dialog';
import { MatDialog } from '@angular/material';
import { AlertService } from 'src/app/shared/service/alert.service';
import Swal from 'sweetalert2/dist/sweetalert2.all'


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      yAxes: [{
        ticks: {
          //steps: 10,
          beginAtZero: true,
          stepSize: 10,
          min: 0,
          max: 100
        }
      }]
    },
    maintainAspectRatio: false

  };
  barChartLabels: Label[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  barChartType: ChartType = 'bar';
  lineChartType: ChartType = 'line';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Неправильный' },
    { data: [], label: 'Правильный' }
  ];


  totalDemoContent = 0;
  totalArticleContent = 0;
  totalUsers = [];
  lastCreatedUsers = [];
  isQuery = true;

  today = new Date()
  lastWeek = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7);
  lastWeekUsersStatistics = []

  categories: any;
  collapseTable: boolean;

  constructor(
    private admindashboardservice: AdminDashboardService,
    private identityService: IdentityService,
    private contentService: ContentService,
    private trainingTestService: TrainingTestService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllArticleContent()
    this.getAllDemoContent()
    this.getAllUsers();
    this.getAllStatistic();
    this.getAllCategories();
  }

  // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public randomize(): void {
  //   this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  // }



  getAllCategories() {
    var _data: any;
    this.contentService.getCategory()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          _data = data
          this.categories = _data;
        },

        error => {
          console.log("error trying to get categories", error);
        })
  }

  categoryCreateDialog() {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: '450px',
      data: {
        create: true
      }
    })

    dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result => {
        console.log('category: ', result);
        if (result != null) {
          var data = result.name
          this.contentService.createCategory({ name: data })
            .pipe(debounceTime(300))
            .pipe(distinctUntilChanged())
            .subscribe(
              response => {
                this.alertService.openSweetAlertToast('success', 'Created sucessfully');
                this.getAllCategories()
              },
              error => {
                this.alertService.openSweetAlert('error', 'Please check your connection')
              }
            )
        }
      })
  }

  categoryUpdateDialog(category) {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: '450px',
      data: {
        update: true,
        category: category
      }
    })

    dialogRef.afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(result => {
        console.log('category: ', result);
        if (result != null) {
          var data = result
          this.contentService.updateCategory(data.id, { name: data.name })
            .pipe(debounceTime(300))
            .pipe(distinctUntilChanged())
            .subscribe(
              response => {
                this.alertService.openSweetAlertToast('success', 'updated sucessfully');
                this.getAllCategories()
              },
              error => {
                this.alertService.openSweetAlert('error', 'Please check your connection')
              }
            )
        }
      })
  }

  categoryDelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        this.contentService.deleteCategory(id)
          .pipe(debounceTime(300))
          .pipe(distinctUntilChanged())
          .subscribe(
            response => {
              this.alertService.openSweetAlertToast('success', 'Deleted sucessfully');
              this.getAllCategories()
            },
            error => {
              console.log('ERROR: trying to delete Category ', error)
              this.alertService.openSweetAlert('error', 'Please check your connection')
            }
          )
      }
    })
  }



  getAllDemoContent() {
    var _data: any;
    this.contentService.getDemoContent()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          _data = data

          this.totalDemoContent = _data.length
        }
        , error => {
          console.log("error trying to get demo content", error);
        }
      )


  }

  getAllArticleContent() {
    var _data: any;
    this.contentService.getArticleContent()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          _data = data

          this.totalArticleContent = _data.length

        },
        error => {
          console.log("error trying to get article content", error);
        }
      )

  }


  getAllUsers() {
    var _data: any;
    var created: Date[] = []

    this.identityService.userGet()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          _data = data
          _data.forEach(item => created.push(new Date(item.created)))
          created.forEach(c => {
            if (c.getDate() == this.lastWeek.getDate() || c.getDate() == this.today.getDate()) {
              this.lastCreatedUsers.push(c)
            }


          })
          this.totalUsers = _data.length

          this.isQuery = false;
        }
        , error => {
          console.log("Error trying to get users: ", error);
        }
      )
  }


  getAllStatistic() {

    var statisticsDate: Date[] = []
    var statistics: any;
    this.trainingTestService.getStatistic()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          statistics = data
          statistics.forEach(item => {
            statisticsDate.push(new Date(item.trainingDate))
          })

          statisticsDate.forEach((s, i) => {
            if (s.getDate() == this.lastWeek.getDate() || s.getDate() == this.today.getDate()) {
              this.lastWeekUsersStatistics.push(statistics[i])
            }
          })

          this.lastWeekStatisticsPercentages(this.lastWeekUsersStatistics)
        },

        error => {
          console.log("Error trying to get all statistics", error);
        }
      )
  }

  lastWeekStatisticsPercentages(lastWeekUsersStatistics) {
    var correctPercentagemonday = 0
    var incorrectPercentagemoday = 0
    var correctPercentagetuesday = 0
    var incorrectPercentagetuesday = 0
    var correctPercentagewednesday = 0
    var incorrectPercentagewednesday = 0
    var correctPercentagethursday = 0
    var incorrectPercentagethursday = 0
    var correctPercentagefriday = 0
    var incorrectPercentagefriday = 0
    var correctPercentagesaturday = 0
    var incorrectPercentagesaturday = 0

    var mondayCount = 0
    var tuesdayCount = 0
    var wednesdayCount = 0
    var thursdayCount = 0
    var fridayCount = 0
    var saturdayCount = 0
    var st = []

    lastWeekUsersStatistics.forEach((l, i) => {

      st.push({
        date: (new Date(l.trainingDate)),
        cpercentage: l.percentageCorrectAnswers,
        ipercentage: l.percentageIncorrectAnswers
      })
    })


    st.forEach((s, i) => {

      if (s.date.getDay() === 1) {//monday
        incorrectPercentagemoday = s.ipercentage + incorrectPercentagemoday
        correctPercentagemonday = s.cpercentage + correctPercentagemonday
        mondayCount += 1
      }

      if (s.date.getDay() === 2) {//tuesday
        incorrectPercentagetuesday = s.ipercentage + incorrectPercentagetuesday
        correctPercentagetuesday = s.cpercentage + correctPercentagetuesday
        tuesdayCount += 1;
      }

      if (s.date.getDay() === 3) {//wednesday
        incorrectPercentagewednesday = s.ipercentage + incorrectPercentagewednesday
        correctPercentagewednesday = s.cpercentage + correctPercentagewednesday
        wednesdayCount += 1
      }

      if (s.date.getDay() === 4) {//thursday
        incorrectPercentagethursday = s.ipercentage + incorrectPercentagethursday
        correctPercentagethursday = s.cpercentage + correctPercentagethursday
        thursdayCount += 1
      }

      if (s.date.getDay() === 5) {//friday
        incorrectPercentagefriday = s.ipercentage + incorrectPercentagefriday
        correctPercentagefriday = s.cpercentage + correctPercentagefriday
        fridayCount += 1
      }

      if (s.date.getDay() === 6) {//saturday
        incorrectPercentagesaturday = s.ipercentage + incorrectPercentagesaturday
        correctPercentagesaturday = s.cpercentage + correctPercentagesaturday
        saturdayCount += 1
      }

    })


    this.barChartData[0].data[0] = Math.round(incorrectPercentagemoday / mondayCount)
    this.barChartData[1].data[0] = Math.round(correctPercentagemonday / mondayCount)

    this.barChartData[0].data[1] = Math.round(incorrectPercentagetuesday / tuesdayCount)
    this.barChartData[1].data[1] = Math.round(correctPercentagetuesday / tuesdayCount)

    this.barChartData[0].data[2] = Math.round(incorrectPercentagewednesday / wednesdayCount)
    this.barChartData[1].data[2] = Math.round(correctPercentagewednesday / wednesdayCount)

    this.barChartData[0].data[3] = Math.round(incorrectPercentagethursday / thursdayCount)
    this.barChartData[1].data[3] = Math.round(correctPercentagethursday / thursdayCount)

    this.barChartData[0].data[4] = Math.round(incorrectPercentagefriday / fridayCount)
    this.barChartData[1].data[4] = Math.round(correctPercentagefriday / fridayCount)

    this.barChartData[0].data[5] = Math.round(incorrectPercentagesaturday / saturdayCount)
    this.barChartData[1].data[5] = Math.round(correctPercentagesaturday / saturdayCount)

  }



  updateOptions() {
    this.getAllStatistic()
  }


  collapse() {
    this.collapseTable = !this.collapseTable;
  }
}
