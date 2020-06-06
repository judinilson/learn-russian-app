import { Component, OnInit } from '@angular/core';
import { TrainingTestService } from 'src/app/shared/service/training-test-service';


@Component({
  selector: 'app-congratulation-answers',
  templateUrl: './congratulation.html',
  styleUrls: ['./congratulation.scss']
})
export class Congratulation implements OnInit 
{
    testRate:any;
    totalCorrectAnswer = 0;
    totalQuestions = 0;
    stars = [1,2,3,4,5]
    selectedValue: number;
    countPercent = 100;
    constructor(private trainingTest: TrainingTestService){}

    ngOnInit(){
    }

    countStar(star) {
        this.selectedValue = star;
        console.log('Value of star', star);
      }
}