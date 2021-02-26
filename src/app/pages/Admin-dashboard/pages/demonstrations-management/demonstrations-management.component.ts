import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContentService } from 'src/app/shared/service/content.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'demonstrations-management',
  templateUrl: './demonstrations-management.component.html',
  styleUrls: ['./demonstrations-management.component.scss']
})
export class DemonstrationsManagementComponent implements OnInit {

  public progress: number;
  public message: string;
  demonstrationContent:any [] = []
  categories: any;
  ContentArr = []
  selectedContent: any[];
  demoSrc: any;
  isQuery = true;
  constructor(
    private contentService: ContentService,
    private router: Router,
    ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getAllCategories()
      this.getAllDemoSrc()
      this.getAllDemonstration()
    }, 200);
  }

  // isHovering: boolean;

  // files: File[] = [];

  // toggleHover(event: boolean) {
  //   this.isHovering = event;
  // }

  // onDrop(files: FileList) {
  //   for (let i = 0; i < files.length; i++) {
  //     this.files.push(files.item(i));
  //   }
  // }

  // public response: {dbPath: ''}; //file response
  // public uploadFinished = (event) => { //unpload finish listiner
  //   this.response = event;
  // }

  // upload(files){
  //   if(files.length === 0){
  //     return 
  //   }
  //   const formData = new FormData();
    

  //   for(let file of files){
  //     formData.append(file.name,file);
  //   }
  //   const uploadReq = new HttpRequest('POST',`http://localhost:5000/api/Content/Content-Demo`,formData,{
  //     reportProgress:true,
  //   })

  //   this.http.request(uploadReq).subscribe(event => {
  //     if(event.type === HttpEventType.UploadProgress)
  //       this.progress = Math.round(100*event.loaded / event.total)
  //     else if(event.type === HttpEventType.Response)
  //       this.message = event.body.toString();
  //   })
  // }


  getAllDemoSrc(){
    var _data : any;
    this.contentService.getDemoSrc()
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(
          data =>{
            _data = data
            this.demoSrc = _data;
            //console.log(this.demoSrc)
          },
          error => {
            console.log("error trying to get demo source", error);
          }
        
        )
  }

  getAllDemonstration() {
    var _data: any;
    this.contentService.getDemoContent()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          _data = data
          this.demonstrationContent = _data;
         //console.log(this.demonstrationContent)
          /* CUSTOMAZE LIST FOR THE CONTENT TABLE */
          setTimeout(() => {
            this.customContentList()
          }, 800);
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


  customContentList(){
    var category:any;
    var demosource:any;
    if(this.categories != undefined && this.demoSrc !== undefined)
      this.demonstrationContent.forEach(x => {
        category = this.categories.filter(y => { return y.id === x.categoryID})
        demosource =  this.demoSrc.filter(y => {return y.id === x.demonstrationContentID})
        this.ContentArr.push({
          id: x.id,
          title: x.title,
          description:x.subtitle,
          category: category[0],
          demosource:demosource[0],
          demosourcelength:demosource[0].demostrationContentses.length,
          demosourceID: x.demonstrationContentID,
          thumb: x.coverImage,
          author: x.author,
          created: this.getDate(x.created)
        })
      })
      this.isQuery = false;
    //console.log(this.ContentArr);
  }

  selectedContentFunc(content: any){

   
    if(this.demonstrationContent.length > 0){
      var filteredContent = this.ContentArr.filter(x => { 
        return x.id === content.id
      })
    this.contentService.newSelectedData(filteredContent[0])
    this.router.navigate(['/admin-uploadTaskDemoContent'])
    }
  }

  clear(){
    this.contentService.newSelectedData(null)
  }

}
