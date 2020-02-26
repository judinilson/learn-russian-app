import { Component, OnInit } from '@angular/core';
import { TrainingTestService } from 'src/app/shared/service/training-test-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss']
})
export class QuestionsAnswersComponent implements OnInit {
  currentIncorrectAnswer = 0;
  currentCorrectAnswer= 0;

  testData:any;
  currentQuestion:any;
  currentAnswers: any;
  currentTest:any;
  index = 0;
  confirm = false;
  countPercent = 10;
  countClick = 0;
  correctAnswer = 0;
  incorrectAnswer =0 ;
  totalQestions = 0;

    constructor(private trainingTest: TrainingTestService,private router: Router) { }


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
    this.totalQestions = this.testData.training.length;
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
        this.trainingTest.totalQestions = this.testData.training.length;
        this.trainingTest.totalCorectAnswer = this.correctAnswer;
        this.router.navigateByUrl('/rate-test');
        console.log('end of exercice');
      }
    }
    

  }


  onConfirm():void{
    this.confirm = !this.confirm;
    this.correctAnswer += this.currentCorrectAnswer;
    this.incorrectAnswer += this.currentIncorrectAnswer;
    console.log(`correct Answer:${this.correctAnswer}  incorrect Answer: ${this.incorrectAnswer}`);
  }

  
 getUserAnswers(ansState:any){ 
    this.currentCorrectAnswer = 0;
    this.currentIncorrectAnswer = 0;
    this.countClick +=1;
  if(this.countClick >= 1){
    this.countClick = 0;
    if(ansState == true){
      this.currentCorrectAnswer +=1;
    }else{
      this.currentIncorrectAnswer +=1;
    }
  }
  console.log(`correct Answer:${this.currentCorrectAnswer}  incorrect Answer: ${this.currentIncorrectAnswer}`);

 }
}
