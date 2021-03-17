import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContentService } from 'src/app/shared/service/content.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles-management',
  templateUrl: './articles-management.component.html',
  styleUrls: ['./articles-management.component.scss']
})
export class ArticlesManagementComponent implements OnInit {
  categories: any;
  articleContent: any;
  isQuery = true;
  articleContentArr:any = []

  constructor(
    private contentService: ContentService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllCategories()
    this.getAllArticleContent()
  }


  selectedContentFunc(content: any){

   
    if(this.articleContent.length > 0){
      var filteredContent = this.articleContentArr.filter(x => { 
        return x.id === content.id
      })
    this.contentService.newSelectedData(filteredContent[0])
    this.router.navigate(['/admin-uploadTaskArticleContent'])
    }
  }
  customContentList(){
    var category:any;
    if(this.categories != undefined && this.articleContent !== undefined)
      this.articleContent.forEach(x => {
        category = this.categories.filter(y => { return y.id === x.categoryID})
        this.articleContentArr.push({
          id: x.id,
          title: x.title,
          description:x.subtitle,
          category: category[0],
          thumb: x.coverImage,
          article: x.article,
          author: x.author,
          created: this.getDate(x.created)
        })
      })
      this.isQuery = false;
    //console.log(this.ContentArr);
  }

  
  getAllArticleContent() {
    var _data: any;
    this.contentService.getArticleContent()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          _data = data
          this.articleContent = _data;
          console.log(this.articleContent)
          /* CUSTOMAZE LIST FOR THE CONTENT TABLE */
          setTimeout(() => {
            this.customContentList()
          }, 500);
        },

        error => {
          console.log("error trying to get demo content", error);
        })
  }


  getAllCategories() {
    var _data: any;
    this.contentService.getCategory()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          _data = data
          this.categories = _data;
        },

        error => {
          console.log("error trying to get categories", error);
        })
  }


  getDate = function(date:any): string{
    const _date = new Date(date)
    return `${_date.getDate()}/${_date.getMonth()}/${_date.getFullYear()}`
  }

  clear(){
    this.contentService.newSelectedData(null)
  }


}
