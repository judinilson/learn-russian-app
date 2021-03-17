import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../environment'
import { DemonstrationContent, Category, ArticleContent, DemoContentPostWithCoverImg, DemoContent, DemonstrationSource } from '../Model/Content';

@Injectable()
export class ContentService {

  private contentDemoData = new BehaviorSubject<any>(null);
  private contentArticleData = new BehaviorSubject<any>(null);
  currentcontentDemo = this.contentDemoData.asObservable();
  currrentContentArticle = this.contentArticleData.asObservable();
   /* PASS SELECTED CONTENT FROM A (component) to B (component)*/
  private contentSelectedData = new BehaviorSubject<any>(null);
  currentContentSelectedData = this.contentSelectedData.asObservable();

  constructor(private http: HttpClient){}

    newContentDemo(demo:any){
        this.contentDemoData.next(demo);
    }

    newContentArticle(article: any)
    {
      this.contentArticleData.next(article);
    }

    //selected data 
    newSelectedData(data:any){
      this.contentSelectedData.next(data)
    }


   

    getArticleContent(){
      return this.http.get<ArticleContent>(environment.articleContentGetUrl)
    }

    uploadArticleContent(data){
      return this.http.post<ArticleContent>(environment.articleContentGetUrl,data)
    }

    updateArticleContent(id,data){
      return this.http.put<ArticleContent>(`${environment.articleContentGetUrl} ${id}`,data)
    }

    deleteArticleContent(id){
      return this.http.delete(`${environment.contentDeleteUrl} ${id}`)
    }

  



    // CATEGORY
    getCategory(){
      return this.http.get<Category>(environment.categoryUrl)
    }
    createCategory(data){
      return this.http.post<Category>(environment.categoryUrl,data)
    }
    updateCategory(id,data){
      return this.http.put<Category>(environment.categoryUrl + id,data)
    }
    deleteCategory(id){
      return this.http.delete<Category>(environment.categoryUrl + id)
    }

    // DEMOSTRATION CONTENT

    getDemoContent(){
      return this.http.get<DemonstrationContent>(environment.demoContentGetUrl)
    }

    createDemoContent(data){
      return this.http.post<DemonstrationContent>(environment.demoContentCreateUrl,data)
    }

    updateDemoContent(id,data){
      return this.http.put<DemonstrationContent>(`${environment.demoContentUpdateUrl} ${id}`,data)
    }

    deleteDemoContent(id){
      return this.http.delete(`${environment.contentDeleteUrl} ${id}`)
    }

    //DEMONSTRATION 


     //uploading cover image to the server 
    uploadCoverImage(data){
      return this.http.post(environment.uploadCoverImg,data);
    }
    // uploading demonstration videos to the server
    uploadSrcFiles(data){
      return this.http.post(environment.uploadfiles,data)
    }

    getDemoSrc(){
      return this.http.get<DemoContent>(environment.demoSrc)
    }
    uploadDemoSrc(data){
      return this.http.post<DemoContent>(environment.demoSrc,data)
    }

    updateDemoSrc(id,data){
      return this.http.put<DemoContent>( `${environment.demosrcUpdateAndDelete} ${id}`,data);
    }

    deleteDemoSource(id){
      return this.http.delete(`${environment.demosrcUpdateAndDelete} ${id}`)
    }

    updateSource(id,data){
      return this.http.put<DemonstrationSource>(`${environment.sourceUpdateAndDelete} ${id}`,data);
    }

    deletesource(id){
      return this.http.delete(`${environment.sourceUpdateAndDelete} ${id}`)
    }

    

   



    //GET IMAGE
    getImage(imageUrl: string): Observable<Blob> {
      return this.http.get(imageUrl, { responseType: 'blob' });
    }
}