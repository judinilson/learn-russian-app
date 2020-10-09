import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'demonstrations-management',
  templateUrl: './demonstrations-management.component.html',
  styleUrls: ['./demonstrations-management.component.scss']
})
export class DemonstrationsManagementComponent implements OnInit {

  public progress: number;
  public message: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
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

  public response: {dbPath: ''}; //file response
  public uploadFinished = (event) => { //unpload finish listiner
    this.response = event;
  }

  upload(files){
    if(files.length === 0){
      return 
    }
    const formData = new FormData();
    

    for(let file of files){
      formData.append(file.name,file);
    }
    const uploadReq = new HttpRequest('POST',`http://localhost:5000/api/Content/Content-Demo`,formData,{
      reportProgress:true,
    })

    this.http.request(uploadReq).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100*event.loaded / event.total)
      else if(event.type === HttpEventType.Response)
        this.message = event.body.toString();
    })
  }


}
