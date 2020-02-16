import { Component, OnInit } from '@angular/core';
import { TrainingTestService } from 'src/app/shared/service/training-test-service';


@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss']
})
export class QuestionsAnswersComponent implements OnInit {
  correctAnswer: number;

  constructor(private trainingTest: TrainingTestService) { }

  testData:any;
  currentQuestion:any;
  currentAnswers: any;
  currentTest:any;
  index = 0;
  state = false;
  confirm = false;
  shadow = '';
  countPercent = 10;

  ngOnInit() {
    this.trainingTest.currrentest.subscribe(data => this.testData = data);
    if(this.testData === null)
    {
      this.testData = JSON.parse(localStorage.getItem('testData'));
      //this.currentTest = JSON.parse(localStorage.getItem('currenttest'));
    }else{
      localStorage.removeItem('testData');
      localStorage.setItem('testData', JSON.stringify(this.testData));
     // this.currentTest = this.testData;
     this.currentQuestion = this.testData.training[0].questions;
     this.currentAnswers = this.testData.training[0].answer;
    }
  }

  onNext(){
    if(this.confirm){
        this.index += 1;
      if(this.index < this.testData.training.length){
        this.currentQuestion = this.testData.training[this.index].questions;
        this.currentAnswers = this.testData.training[this.index].answer;
        this.confirm = !this.confirm;
        this.countPercent += 10;
      }else{
        this.countPercent = 100;
        console.log('end of exercice');
      }
    }
    

  }


  onConfirm():void{
    this.confirm = !this.confirm;
  }

  
 getUserAnswers(ans:any){ 
   if(ans.states == true){
     this.correctAnswer +=1;
   }else{
     this.correctAnswer +=1;
   }
 }

}
