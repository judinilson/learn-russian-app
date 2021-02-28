import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { AlertService } from "src/app/shared/service/alert.service";
import { ContentService } from "src/app/shared/service/content.service";
import Swal from "sweetalert2";
import { Location } from '@angular/common';
import { Editor,toHTML,toDoc, Toolbar } from 'ngx-editor';
import { schema } from 'ngx-editor/schema';




@Component({
    selector: 'upload-article',
    templateUrl: './upload-article.html',
    styleUrls: ['./upload-article.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UploadArticleTaskComponent implements OnInit {
    uploadArticleForm: FormGroup;
    imagePath;
    imgURL: any;
    message: string;
    imagdbUrl: any;
    imageUpload: boolean;
    formDataCoverImg: FormData;
    receiveSelectedData: any
    isUpdate = false;
    uploadbtn = '';
    isQuery: boolean = true;
    alert = new Observable<boolean>();
    categories: any;
    editor: Editor;
    toolbar: Toolbar = [
        ["bold", "italic"],
        ["underline", "strike"],
        ["code", "blockquote"],
        ["ordered_list", "bullet_list"],
        [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
        ["link", "image"],
        ["text_color", "background_color"],
        ["align_left", "align_center", "align_right", "align_justify"]
      ];
  //html: '';
  //const jsonDoc = toDoc(html);

  

    constructor(
        //private _ngZone: NgZone,
        private formBuilder: FormBuilder,
        private contentService: ContentService,
        //public dialog: MatDialog,
        private _location: Location,
        private alertService: AlertService,) {

    }

    ngOnInit(): void {

        this.editor = new Editor();

        var observable = new Observable(observer => {


            observer.next(1)
            this.getAllCategories();


            this.contentService.currentContentSelectedData.subscribe(
                x => {
                    this.receiveSelectedData = x

                })
            this.uploadArticleForm = this.formBuilder.group({
                title: [''],
                description: [''],
                category: [null],
                article: [null]
            })
            if (this.receiveSelectedData === null) {

                observer.next(2)
                this.uploadArticleForm = this.formBuilder.group({
                    title: ['', [Validators.required]],
                    description: ['', [Validators.required]],
                    category: [null, [Validators.required]],
                    article: [null, [Validators.required]]
                })
                this.uploadbtn = 'SAVE'
            } else {
                observer.next(2)

                this.isUpdate = true;
                this.uploadbtn = 'UPDATE'
                console.log(this.receiveSelectedData);
                // if (this.receiveSelectedData !== null || this.receiveSelectedData !== undefined) {
                //   this.selectedDemoSourceIDFromReceivedData = this.receiveSelectedData.demosourceID
                //   this.selectedIDFromReceivedData = this.receiveSelectedData.id
                //   setTimeout(() => {
                //     if (this.categories != undefined) {
                //       observer.next(3)
                //       this.selectedcategory = this.categories.filter(x => {
                //         return x.id === this.receiveSelectedData.category.id
                //       })
                //     }


                //     //console.log(this.selectedcategory)

                //     if (this.receiveSelectedData.thumb !== null) {
                //       var https = 'https://'
                //       var thumburl = this.receiveSelectedData.thumb.includes(https) ? this.receiveSelectedData.thumb : https + this.receiveSelectedData.thumb
                //       this.imgURL = thumburl
                //     }

                //     //this.getImageFromService(thumburl)
                //     //this.imgURL = this.receiveSelectedData.thumb
                //     observer.next(4);
                //     this.uploadForm = this.formBuilder.group({
                //       title: [this.receiveSelectedData.title],
                //       description: [this.receiveSelectedData.description],
                //       category: this.selectedcategory !== undefined ? [this.selectedcategory[0].name] : ['']
                //     })
                //     this.demoContentsrc = this.receiveSelectedData.demosource.demostrationContentses
                //   }, 400);
                // }

                this.uploadArticleForm = this.formBuilder.group({
                    title: ['', [Validators.required]],
                    description: ['', [Validators.required]],
                    category: [null, [Validators.required]],
                    article: [null, [Validators.required]]
                })

            }
            observer.complete();
            this.isQuery = false;


        })

        observable.subscribe({
            next: x => console.log('got value ' + x),
            error: err => console.error('something wrong occurred: ' + err),
            complete: () => console.log('done'),
        });


    }

    

    get uploadform() { return this.uploadArticleForm.controls }


    // UPLOAD IMAGE AND PREVIEW
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

        //form data to upload to server
        let fileToUpload = <File>files[0];
        this.formDataCoverImg = new FormData();
        this.formDataCoverImg.append('file', fileToUpload, fileToUpload.name);
    }



    //UPLOAD DATA 
    uploadData(){}



    //DELETE CONTENT 
    deleteContent() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.value) {

                //DELETE CONTENT 
                if (this.receiveSelectedData.id !== null)
                    this.contentService.deleteDemoContent(this.receiveSelectedData.id)
                        .pipe(debounceTime(500))
                        .pipe(distinctUntilChanged())
                        .subscribe(
                            data => {
                                this.alertService.openSweetAlertToast('success', 'sucessfully Deleted');
                                this.backwardbtn()
                            },
                            error => {
                                //this.alertService.openSweetAlertToast('success', 'sucessfully Deleted');
                                this.backwardbtn()
                                //this.alertService.openSweetAlert('error', 'Please check your connection')
                            }
                        )






            }
        })
    }

    //CLOSE ALERT MESSAGE 
    closeAlert() {
        this.alert = new BehaviorSubject<boolean>(false);
    }

    //BACK TO THE TABLE BUTTON 
    backwardbtn() {
        this._location.back()
    }


    //GET CATEGORY 
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

    // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}