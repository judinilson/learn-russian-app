import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DemoDataService {

  private contentDemoData = new BehaviorSubject<any>(null);
  currentcontentDemo = this.contentDemoData.asObservable();

  constructor() { }

    newContentDemo(demo:any){
        this.contentDemoData.next(demo);
    }

}