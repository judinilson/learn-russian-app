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
    constructor(private trainingTest: TrainingTestService){}

    ngOnInit(){
        if(this.trainingTest.totalCorectAnswer != null){
            this.totalCorrectAnswer = this.trainingTest.totalCorectAnswer;
            this.totalQuestions = this.trainingTest.totalQestions;
        }
        console.log(this.totalQuestions);
       
    }

    countStar(star) {
        this.selectedValue = star;
        console.log('Value of star', star);
      }
}