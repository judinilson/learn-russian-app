import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { ContentService } from 'src/app/shared/service/content.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-dialog-upload',
  templateUrl: './upload-dialog.html',
  styleUrls: ['./upload-dialog.scss']
})
export class DialogUploadComponent implements OnInit {
  files: any[] = [];
  formGroup: FormGroup;
  isPost:boolean;
  isPut: boolean;
  sourceData: any;
  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    public dialogRef: MatDialogRef<DialogUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.sourceData = this.data && this.data.data;

    if (this.data.isCreate) {
      this.isPost = true;
      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        uploadcontent: ['', [Validators.required]]
      })
    }

    if(this.data.isUpdate){
      this.isPut = true;
      this.formGroup = this.formBuilder.group({
        name: [this.data.source.title, [Validators.required]],
        //uploadcontent: ['', [Validators.required]]
      })
    }




  }

  get _formGroup() { return this.formGroup.controls }

  submit() {

    if (this.isPost)
      if (this._formGroup.name.valid && this.files.length !== 0) {
        this.dialogRef.close({
          srcname: this._formGroup.name.value,
          src: this.files[0]
        })
      }

    if (this.isPut) {
      if (this._formGroup.name.valid){
        this.data.source.title = this._formGroup.name.value
        this.contentService.updateSource(this.data.source.id,this.data.source)
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(
          data =>{
            this.dialogRef.close({
              title: this._formGroup.name.value,
              isupdatetitle: true
            })
            console.log("Source updated Sucessfully: ",data)
            //console.log(this.demoSrc)
          },
          error => {
            console.log("error trying to update source", error);
          }
        
        )
        
      }
    }
  }


  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals?) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}