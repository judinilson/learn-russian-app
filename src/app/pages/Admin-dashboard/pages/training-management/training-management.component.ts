import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContentService } from 'src/app/shared/service/content.service';
import { TrainingTestService } from 'src/app/shared/service/training-test.service';

@Component({
  selector: 'app-training-management',
  templateUrl: './training-management.component.html',
  styleUrls: ['./training-management.component.scss']
})
export class TrainingManagementComponent implements OnInit {

  categories: any;
  trainingContent: any;
  isQuery = true;
  trainingContentArr:any = []

  constructor(
    private contentService: ContentService,
    private trainingService: TrainingTestService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllCategories()
    this.getAllTrainingContent()
    
  }


  selectedContentFunc(training: any){

   
    if(this.trainingContentArr.length > 0){
      var filteredTraining = this.trainingContentArr.filter(x => { 
        return x.id === training.id
      })
    this.trainingService.newSelectedData(filteredTraining[0])
    this.router.navigate(['/admin-uploadTaskTrainingContent'])
    }
  }

  customContentList(){
    var category:any;
    if(this.categories != undefined && this.trainingContent !== undefined)
      this.trainingContent.forEach(x => {
        category = this.categories.filter(y => { return y.id === x.categoryId})
        this.trainingContentArr.push({
          id: x.id,
          title: x.title,
          category: category[0],
          thumb: x.coverImage,
          training: x.trainings,
          author: x.author,
        })
      })
      this.isQuery = false;
    //console.log(this.ContentArr);
  }

  getAllTrainingContent() {
    var _data: any;
    this.trainingService.getTrainingContent()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          _data = data
          this.trainingContent = _data;
          console.log(this.trainingContent)
          /* CUSTOMAZE LIST FOR THE CONTENT TABLE */
          setTimeout(() => {
            this.customContentList()
          }, 500);
        },

        error => {
          console.log("error trying to get demo content", error);
        })
  }

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

  clear(){
    this.trainingService.newSelectedData(null)
  }

}
