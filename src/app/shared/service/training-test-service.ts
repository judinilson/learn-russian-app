import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TrainingTestService {

  private trainingTestData = new BehaviorSubject<any>(null);
  currrentest = this.trainingTestData.asObservable();

  constructor() { }

    newTraining(test:any){
        this.trainingTestData.next(test);
    }


}