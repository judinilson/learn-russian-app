import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {environment} from '../environment'
import { DemonstrationContent, Category, ArticleContent } from '../Model/Content';

@Injectable()
export class ContentService {

  private contentDemoData = new BehaviorSubject<any>(null);
  private contentArticleData = new BehaviorSubject<any>(null);
  currentcontentDemo = this.contentDemoData.asObservable();
  currrentContentArticle = this.contentArticleData.asObservable();

  constructor(private http: HttpClient){}

    newContentDemo(demo:any){
        this.contentDemoData.next(demo);
    }

    newContentArticle(article: any)
    {
      this.contentArticleData.next(article);
    }



    getDemoContent(){
      return this.http.get<DemonstrationContent>(environment.demoContentGetUrl)
    }

    getArticleContent(){
      return this.http.get<ArticleContent>(environment.articleContentGetUrl)
    }

    getCategory(){
      return this.http.get<Category>(environment.categoryGetUrl)
    }


}