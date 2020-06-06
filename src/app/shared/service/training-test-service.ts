import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DragDropQuestion } from 'src/app/pages/test/questions-answers/questions-answers.component';

@Injectable()
export class TrainingTestService {

  private trainingTestData = new BehaviorSubject<any>(null);
  currrentest = this.trainingTestData.asObservable();

  totalCorrectAnswer = null;
  totalIncorrectAnswer = null;
  totalQestions = null;
  totalAnswers = null;
  testDone = null;
  _start = null;
  _continue = null;

  // items = [
  //   'Отмечать',
  //   'Печь',
  //   'Принимать',
  //   'Разыгрывать',
  //   'Стараться',
  //   'Устраивать',
  // ];

  droplistAnsFirst: DragDropQuestion[] = new Array(
    { key: "соревнования", value: "Устраивать" },
    { key: "стать лучше", value: "Стараться" },
    { key: "праздник", value: "Отмечать" },
    { key: "блины", value: "Печь" },
    { key: "конкурсы", value: "Разыгрывать" },
    { key: "гостей", value: "Принимать" },
  )

  // itemsDragSecond = [
  //   '',
  //   'Печь',
  //   'Принимать',
  //   'Разыгрывать',
  //   'Стараться',
  //   'Устраивать',
  // ];

  // droplistAnsSecond: DragDropQuestion[] = new Array(
  //   { key: "соревнования second", value: "Устраивать" },
  //   { key: "стать лучше", value: "Стараться" },
  //   { key: "праздник", value: "Отмечать" },
  //   { key: "блины", value: "Печь" },
  //   { key: "конкурсы", value: "Разыгрывать" },
  //   { key: "гостей", value: "Принимать" },
  // )

  constructor() { }

    newTraining(test:any){
        this.trainingTestData.next(test);
    }


  
    
}