import { Component, OnInit } from '@angular/core';
import { TrainingTestService } from 'src/app/shared/service/training-test-service';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss']
})
export class QuestionsAnswersComponent implements OnInit {
  answerform: FormGroup;

  testData: any;
  currentQuestion: any;
  currentAnswers = [];
  currentTest: any;
  index = 0;
  confirm = false;
  countPercent = 0;
  countClick = 0;
  totalCorrectAnswer = 0;
  totalIncorrectAnswer = 0;
  totalQestions = 0;
  totalAnswers = 0;
  testDone = false;




  //drag and drop list
  _correctincorrectDragDropAns = []
  dragDropDataContainer: string[]
  dragDropTaskUnConfirm: boolean
  isDragDropQuestionfirst = false
  isDragDropQuestionsecond = false
  items = [
    'Отмечать',
    'Печь',
    'Принимать',
    'Разыгрывать',
    'Стараться',
    'Устраивать',
  ];  basket = [];

  droplistAns: DragDropQuestion[] 
  randomIndexs: any;
  _getUserAnswer: boolean;
  confirmCount = 1;
  _getRandomIndex: any;
  _start = false;
  _continue = false;

  constructor(
    private trainingTestService: TrainingTestService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { 
    
   
  }


  ngOnInit() {
    //get the training type 
    if(this.trainingTestService._continue !=null)
      this._continue = !this._continue;
    else
      this._start = !this._start
    console.log("user wanna continue: ",this._continue);
    console.log("user wanna start: ",this._start);

  
    this.trainingTestService.currrentest.subscribe(data => this.testData = data);
    if (this.testData === null) {
      this.testData = JSON.parse(localStorage.getItem('testData'));
      //this.currentTest = JSON.parse(localStorage.getItem('currenttest'));
    } else {
      localStorage.removeItem('testData');
      localStorage.setItem('testData', JSON.stringify(this.testData));

      this.choseQuetions(0)
    }
    this.totalQestions = this.testData.training.length +1
   


    //user choices check box in form builder
    this.newCheckboxes()

    //drag and drop training
    this.droplistAns = this.trainingTestService.droplistAnsFirst;


    //count percentage of progress bar 
    this._countbarPercent(this.index)


    //count how many times visited content page 
    this.countTimesUservisitContentPage()
  }

 
  onNext() {
    this._start = false;
    if (this.confirm) {
      this.confirmCount = 1
      if (this.index <= this.testData.training.length) {
        this.choseQuetions(0)
        this.confirm = false
        this._countbarPercent(this.index)
         this.newCheckboxes()
      } else {
        this._countbarPercent(this.index)
        localStorage.removeItem('currentTestIndex');
        setTimeout(() => {
          this.testIsDone()
        }, 2000);
        
        console.log('end of exercice');
      }
    }else{
      this.dismissConfirmAlert('Please confirm your answers.')
    }


  }

  


  onConfirm(): void {
  
   
    if(this.confirmCount == 1){

      if((!this.isDragDropQuestionfirst && !this.isDragDropQuestionsecond)){

        if(!this.answerform.valid){
          this.dismissConfirmAlert('please complete the task by chosing answer')
          this.confirmCount = 1 
          return
        }else{
          
          this.confirm = !this.confirm;
          this.confirmCount = 0
          this.index += 1;
          this.answerform.value.currentanswers
            .map((v, i) => v ? this.currentAnswers[i].state : null)
            .filter(v => v !== null)
            .forEach((ans,i)=> { 
              if(ans === false) this.totalIncorrectAnswer += 1
              else{
                this.totalCorrectAnswer +=1
              } 
            })

            console.log('popep index: ',  this.randomIndexs.shift());
           
            console.log(' random indexes [] after pop: ', this.randomIndexs);
            this.setCurrentTDataLocalstorage(this.randomIndexs)
    
            console.log(`total correct Answer:${this.totalCorrectAnswer}  total incorrect Answer: ${this.totalIncorrectAnswer}`);
            return
        }
    
      }
      

      if (this.dragDropDataContainer === undefined && (this.isDragDropQuestionfirst || this.isDragDropQuestionsecond)) {
        this.dismissConfirmAlert('please complete the task by chosing answer.')
        this.confirmCount = 1
        return;
      } else {
        if (this.dragDropDataContainer.length >= this.droplistAns.length) {
          this.confirm = !this.confirm;
          this.confirmCount = 0
          this.index += 1;

          console.log('popep index: ',  this.randomIndexs.shift());
          console.log(' random indexes [] after pop: ', this.randomIndexs);
          this.setCurrentTDataLocalstorage(this.randomIndexs)

          this.totalAnswers += this.dragDropDataContainer.length
          this.droplistAns.forEach((el, index) => {
            if (el.value === this.dragDropDataContainer[index]) {
              this._correctincorrectDragDropAns[index] = true
              this.totalCorrectAnswer +=1
            } else {
              this._correctincorrectDragDropAns[index] = false;
              this.totalIncorrectAnswer += 1
            }
  
          });

        } else {
          this.dismissConfirmAlert('Please complete all task and confirm.')
          this.confirmCount = 1
        }
      }

    }else{
      this.dismissConfirmAlert('cannot reconfirm, press next button')
    }


  }


  //user choicess
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }



  private newCheckboxes(){
    this.answerform = this.formBuilder.group({
      currentanswers: new FormArray([], this.minSelectedCheckboxes(1))
    });
    this.addCheckboxes()
  }
  addCheckboxes() {
    this.currentAnswers.forEach((o, i) => {
      const control = new FormControl(false); // if first item set to true, else false
      (this.answerform.controls.currentanswers as FormArray).push(control);
    });
  }





  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.dragDropDataContainer = event.container.data

      console.log(event.container.data);
    }

  }









  dismissConfirmAlert(message) {
    this._snackBar.open(message, null, {
      duration: 3 * 1000,

    })
  }


  randomExerciceIndex(data) {
    let arr = [];
    do {
      let ran = Math.floor(Math.random() * data.length);
      arr = arr.indexOf(ran) > -1 ? arr : arr.concat(ran);
    } while (arr.length < data.length)

    return arr;
  }

  choseQuetions(changeQuetionindex) {
    this.isDragDropQuestionsecond, this.isDragDropQuestionfirst = false;
    if (this._start === true) {
      //when starting new test index need to remove user visited content page from storage
      localStorage.removeItem('userVisited');
      var data = new Array(this.testData.training.length + 1)
      this.randomIndexs = this.randomExerciceIndex(data)
      this.setCurrentTDataLocalstorage(this.randomIndexs)
      console.log('first random []: ', this.randomIndexs);
    }
    if(this._continue === true){
      
      this.getCurrentTDataLocalStorage() 
      console.log(' random indexes [] before pop: ', this.randomIndexs);
    }


    if (this.randomIndexs[changeQuetionindex] === this.testData.training.length) 
    {
      //this.isDragDropQuestionsecond = !this.isDragDropQuestionsecond
      this._correctincorrectDragDropAns = []
      this.isDragDropQuestionfirst = !this.isDragDropQuestionfirst;
      console.log('is drag drop first',this.items);
    }
    // if (this.randomIndexs[changeQuetionindex] === this.testData.training.length + 1)
    // {
    //   this.isDragDropQuestionfirst = !this.isDragDropQuestionfirst;
    //   this.items = this.trainingTest.itemsDragSecond;
    //   this.droplistAns = this.trainingTest.droplistAnsSecond;
    //   this._correctincorrectDragDropAns = []
    //   this.isDragDropQuestionsecond = !this.isDragDropQuestionsecond
    //   console.log('is drag drop second',this.items);
    // } 
    

    if (!this.isDragDropQuestionfirst && !this.isDragDropQuestionsecond) {
      this.currentQuestion = this.testData.training[this.randomIndexs[changeQuetionindex]].questions;
      this.currentAnswers = this.testData.training[this.randomIndexs[changeQuetionindex]].answer;
      this.totalAnswers += this.currentAnswers.length
    }




  }


  _countbarPercent(index){
    if(index === 0) this.countPercent = 5
    else
      this.countPercent = 100 * index / + this.totalQestions;
  }

  setCurrentTDataLocalstorage(randomIndxes){
    var currentTestData = {
      'randomIndex': randomIndxes,
      'totalquestions': this.index,
      'countPercent': this.countPercent,
      'totalCorrectAnswer': this.totalCorrectAnswer,
      'totalIncorrectAnswer': this.totalIncorrectAnswer
    }
    localStorage.removeItem('currentTestData  ');
    localStorage.setItem('currentTestData ',JSON.stringify(currentTestData ));
  }

  getCurrentTDataLocalStorage(){
    this._getRandomIndex = JSON.parse(localStorage.getItem('currentTestData '))
    if(this._getRandomIndex  != null) 
    {
      this.randomIndexs = this._getRandomIndex.randomIndex
      this.index =this._getRandomIndex.totalquestions
      this.countPercent = this._getRandomIndex.countPercent
      this.totalCorrectAnswer = this._getRandomIndex.totalCorrectAnswer
      this.totalIncorrectAnswer = this._getRandomIndex.totalIncorrectAnswer
      // this._countbarPercent(this.index)
    }
  }


  testIsDone(){
    var rest = (this.totalAnswers - (this.totalCorrectAnswer + this.totalIncorrectAnswer));
    var total = (this.totalAnswers - rest)
    this.storeResult(total)


    this.router.navigateByUrl('/rate-test');
    this.index = 0;
  }


  storeResult(totalAnswers){
    var _trainingDataResult = {
      'totalCorrectAnswers': this.totalCorrectAnswer,
      'totalIncorrectAnswers': this.totalIncorrectAnswer,
      'totalAnswers': totalAnswers,
      'totalQuestions': this.totalQestions
    }
    localStorage.removeItem('trainingDataResult');
    localStorage.setItem('trainingDataResult', JSON.stringify(_trainingDataResult));
  }


  countTimesUservisitContentPage(){
    var visited: any;
    if(visited = JSON.parse(localStorage.getItem('userVisited')) === null){
      var userVisited = {
        'user_visited_content': 0,
      }
      localStorage.removeItem('userVisited');
      localStorage.setItem('userVisited', JSON.stringify(userVisited));
    }
    
  }
  
}


export interface DragDropQuestion {
  key: string;
  value: string;
}

export interface UserChoiceI{
  clicked: boolean;
  index: number;
}