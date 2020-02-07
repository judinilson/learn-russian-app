import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DemoDataService {

  private contentDemoData = new BehaviorSubject<any>(null);
  private contentArticleData = new BehaviorSubject<any>(null);
  currentcontentDemo = this.contentDemoData.asObservable();
  currrentContentArticle = this.contentArticleData.asObservable();

  constructor() { }

    newContentDemo(demo:any){
        this.contentDemoData.next(demo);
    }

    newContentArticle(article: any)
    {
      this.contentArticleData.next(article);
    }

}