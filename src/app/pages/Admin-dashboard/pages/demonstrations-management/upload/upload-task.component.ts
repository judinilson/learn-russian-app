import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/shared/service/content.service';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
  uploadForm:FormGroup;
  categories: any;

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    
  ){

  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      title:['',[Validators.required]],
      subtitle:['',[Validators.required]],
      category:[null,[Validators.required]]

    })

     this.getAllCategories();
  }


  get _uploadForm(){return this.uploadForm.controls }


  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  // @Input() file: File;

  // task: AngularFireUploadTask;

  // percentage: Observable<number>;
  // snapshot: Observable<any>;
  // downloadURL: string;

  // constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  // ngOnInit() {
  //   this.startUpload();
  // }

  // startUpload() {

  //   // The storage path
  //   const path = `test/${Date.now()}_${this.file.name}`;

  //   // Reference to storage bucket
  //   const ref = this.storage.ref(path);

  //   // The main task
  //   this.task = this.storage.upload(path, this.file);

  //   // Progress monitoring
  //   this.percentage = this.task.percentageChanges();

  //   this.snapshot = this.task.snapshotChanges().pipe(
  //     tap(console.log),
  //     // The file's download URL
  //     finalize( async() =>  {
  //       this.downloadURL = await ref.getDownloadURL().toPromise();

  //       this.db.collection('files').add( { downloadURL: this.downloadURL, path });
  //     }),
  //   );
  // }

  // isActive(snapshot) {
  //   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  // }


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
}