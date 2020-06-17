import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IdentityService} from '../service/identity.service'
import {ContentService} from '../service/content.service'
import { debounce } from 'rxjs/operators';

@Injectable()
export class AdminDashboardService {
    private _totalContent:any;
    totalDemo:any;


    constructor(
        private http: HttpClient,
        private identityService: IdentityService,
        private contentService: ContentService
        ){}

    

// totalNewUsers(){
//     this.identityService.
// }


totalDemoContent(){
    this.contentService.getDemoContent()
    .subscribe(
        data =>{
            this._totalContent = data
        }
        ,error =>{
            console.log("error trying to get demo content",error);
        }
    )

    if(this._totalContent.length > 15){
        console.log(this.totalDemo);
        return this.totalDemo = this._totalContent.slice(-10).length
        
    }else{
        console.log(this.totalDemo);
        return this.totalDemo = this._totalContent.length

    }

   return 
}

totalArticleContent(){
    this.contentService.getArticleContent()
    .subscribe(
        data =>{
            this.totalDemo = data
        },
        error => {
            console.log("error trying to get article content",error);
        }
    )

    if(this._totalContent.length > 15){
        console.log(this.totalDemo);
        return this.totalDemo.slice(-10).length
    }else{
        console.log(this.totalDemo);
        return this.totalDemo.length
    }

   return 

   
}

   
}