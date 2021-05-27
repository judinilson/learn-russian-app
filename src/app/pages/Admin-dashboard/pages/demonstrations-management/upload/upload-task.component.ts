import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  NgZone,
  ViewChild,
} from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  take,
  tap,
} from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContentService } from "src/app/shared/service/content.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogUploadComponent } from "./upload-dialog/upload-dialog";
import { Location } from "@angular/common";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { AlertService } from "src/app/shared/service/alert.service";

@Component({
  selector: "upload-task",
  templateUrl: "./upload-task.component.html",
  styleUrls: ["./upload-task.component.scss"],
})
export class UploadTaskComponent implements OnInit {
  uploadForm: FormGroup;
  categories: any;

  imagePath;
  imgURL: any;
  message: string;
  imagdbUrl: any;
  imageUpload: boolean;
  formDataCoverImg: FormData;
  demoContentsrc: any[] = []; //BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  receiveSelectedData: any;
  isUpdate = false;
  uploadbtn = "";
  isQuery: boolean = true;
  alert = new Observable<boolean>();

  @ViewChild("autosize", { static: false }) autosize: CdkTextareaAutosize;
  demosourceId: number;
  selectedcategory: any;
  private _sanitizer: any;
  selectedDemoSourceIDFromReceivedData: any;
  selectedIDFromReceivedData: any;
  demosourceIsUpdated: boolean;
  selectedSourceToUpdate: any;
  upSource: boolean;
  loading = false;
  currentUser: string;

  constructor(
    private _ngZone: NgZone,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    public dialog: MatDialog,
    private _location: Location,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.currentUser = `${currentUser.firstName} ${currentUser.lastName}`;
    var observable = new Observable((observer) => {
      observer.next(1);
      this.getAllCategories();

      this.contentService.currentContentSelectedData.subscribe((x) => {
        this.receiveSelectedData = x;
      });

      this.uploadForm = this.formBuilder.group({
        title: [""],
        description: [""],
        category: [null],
      });

      if (this.receiveSelectedData === null) {
        observer.next(2);
        this.uploadForm = this.formBuilder.group({
          title: ["", [Validators.required]],
          description: ["", [Validators.required]],
          category: [null, [Validators.required]],
        });
        this.uploadbtn = "SAVE";
      } else {
        observer.next(2);

        this.isUpdate = true;
        this.uploadbtn = "UPDATE";
        console.log(this.receiveSelectedData);
        if (
          this.receiveSelectedData !== null ||
          this.receiveSelectedData !== undefined
        ) {
          this.selectedDemoSourceIDFromReceivedData =
            this.receiveSelectedData.demosourceID;
          this.selectedIDFromReceivedData = this.receiveSelectedData.id;
          setTimeout(() => {
            if (this.categories != undefined) {
              observer.next(3);
              this.selectedcategory = this.categories.filter((x) => {
                return x.id === this.receiveSelectedData.category.id;
              });
            }

            //console.log(this.selectedcategory)

            if (this.receiveSelectedData.thumb !== null) {
              var https = "https://";
              var thumburl = this.receiveSelectedData.thumb.includes(https)
                ? this.receiveSelectedData.thumb
                : https + this.receiveSelectedData.thumb;
              this.imgURL = thumburl;
            }

            //this.getImageFromService(thumburl)
            //this.imgURL = this.receiveSelectedData.thumb
            observer.next(4);
            this.uploadForm = this.formBuilder.group({
              title: [this.receiveSelectedData.title],
              description: [this.receiveSelectedData.description],
              category:
                this.selectedcategory !== undefined
                  ? [this.selectedcategory[0].name]
                  : [""],
            });
            this.demoContentsrc =
              this.receiveSelectedData.demosource.demostrationContentses;
          }, 400);
        }
      }
      observer.complete();
      this.isQuery = false;
    });

    observable.subscribe({
      next: (x) => console.log("got value " + x),
      error: (err) => console.error("something wrong occurred: " + err),
      complete: () => console.log("done"),
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  get _uploadForm() {
    return this.uploadForm.controls;
  }

  preview(files) {
    if (files.length === 0) return;

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
    };

    //form data to upload to server
    let fileToUpload = <File>files[0];
    this.formDataCoverImg = new FormData();
    this.formDataCoverImg.append("file", fileToUpload, fileToUpload.name);
  }

  //DIALOG upload
  uploadContent(create: boolean, update: boolean) {
    const dialogRef = this.dialog.open(DialogUploadComponent, {
      width: "750px",
      data: {
        source: this.selectedSourceToUpdate,
        isCreate: create,
        isUpdate: update,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe((result) => {
        if (result !== null) {
          if (result.isupdatetitle) {
            this.demoContentsrc.map((x) => {
              if (x.title == this.selectedSourceToUpdate.title)
                x.title = result.title;
            });
            console.log(result);
          } else {
            this.demoContentsrc.push({
              title: result.srcname,
              src: result.src,
            });

            console.log("+ ANOTHE ONE ADDED ", this.demoContentsrc);
          }
        }
      });
  }

  //ADD CONTENT
  uploadData() {
    this.loading = true;

    //POST
    if (!this.isUpdate) {
      if (!this.uploadForm.invalid && this.demoContentsrc.length !== 0) {
        var imgurl: any;
        //var urldbmediafiles: MediaContent[] = []

        if (this.imagePath !== undefined) {
          this.contentService
            .uploadCoverImage(this.formDataCoverImg)
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(
              (res) => {
                //back to table
                imgurl = res;
                if (res != null)
                  this.uploadMediaFilesAndContent(this.demoContentsrc, imgurl);
              },
              (error) => {
                console.log(
                  "Error trying to upload content image cover : ",
                  error
                );
                this.alertService.openSweetAlert(
                  "error",
                  "Please check your connection"
                );
                this.loading = false;
              }
            );
        }
      } else {
        this.alert = new BehaviorSubject<boolean>(true);
      }
    }

    //PUT

    if (this.isUpdate) {
      if (!this.uploadForm.invalid) {
        var imageUpdate: any;
        var _data: any;

        var catg =
          this._uploadForm.category.value.id === undefined ||
          this._uploadForm.category.value.id === this.selectedcategory[0].id
            ? this.receiveSelectedData.category.id
            : this._uploadForm.category.value.id;

        if (this.imagePath !== undefined) {
          this.contentService
            .uploadCoverImage(this.formDataCoverImg)
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(
              (res) => {
                _data = res;
                imageUpdate = _data.dbPath;
                this.updateContentFunc(imageUpdate, catg);
                this.alertService.openSweetAlertToast(
                  "success",
                  "Image updated sucessfully"
                );
              },
              (error) => {
                console.log(
                  "Error trying to update content image cover : ",
                  error
                );
                this.alertService.openSweetAlert(
                  "error",
                  "Please check your connection"
                );
                this.loading = false;
              }
            );
        } else {
          imageUpdate = this.receiveSelectedData.thumb;
          this.updateContentFunc(imageUpdate, catg);
        }
      } else {
        this.alert = new BehaviorSubject<boolean>(true);
      }
    }
  }

  //UPDATE CONTENT
  updateContentFunc(imageUpdate, catg) {
    var date = new Date();
    var demosourceToUpdate = false;
    var demosrcFiles = this.demoContentsrc.filter((x) => {
      return typeof x.src !== "string";
    });

    console.log(demosrcFiles);
    if (demosrcFiles.length !== 0) {
      demosourceToUpdate = true;
      this.uploadMediaFilesAndContent(demosrcFiles);
    }

    this.contentService
      .updateDemoContent(this.receiveSelectedData.id, {
        title: this._uploadForm.title.value,
        subtitle: this._uploadForm.description.value,
        coverImage: imageUpdate,
        categoryID: catg,
      })
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        (res) => {
          //back to table
          console.log("Successfully Updated : ", res);
          if (!demosourceToUpdate) {
            this.backwardbtn();
            this.alertService.openSweetAlertToast(
              "success",
              "updated sucessfully"
            );
          }
        },
        (error) => {
          //this.error = error;
          //this.loading = false;
          //this.alert = new BehaviorSubject<boolean>(true);
          console.log("Error trying to update content : ", error);
          this.alertService.openSweetAlert(
            "error",
            "Please check your connection"
          );
        }
      );
  }

  //UPLOAD MEDIA FILES
  uploadMediaFilesAndContent(_demoContentsrc, imgurl?) {
    var date = new Date();
    var mediafilesUrl: any;
    var mediaTitles = [];
    var files = [];
    var urldbmediafiles: MediaContent[] = [];

    var observable = new Observable((observer) => {
      _demoContentsrc.forEach((x) => {
        files.push(x.src);
        mediaTitles.push(x.title);
      });

      if (files.length === 0) {
        console.error("file array is empty");
        return;
      }
      let filesToUpload: File[] = files;
      const formData = new FormData();

      Array.from(filesToUpload).map((file, index) => {
        return formData.append("file" + index, file, file.name);
      });

      this.contentService
        .uploadSrcFiles(formData)
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(
          (res) => {
            console.log(
              "DATA source file Successfully uploaded: ",
              urldbmediafiles
            );
            if (res !== null) {
              mediafilesUrl = res;
              for (let index = 0; index < mediafilesUrl.length; index++) {
                urldbmediafiles.push({
                  title: mediaTitles[index],
                  src: mediafilesUrl[index],
                });
              }

              /*
               Upload content to the DB ONLY ON POST
              */
              if (urldbmediafiles.length !== 0 && !this.isUpdate) {
                setTimeout(() => {
                  observer.next(1);
                  /* UPLOAD DEMONSTRATION SOURCE */
                  this.contentService
                    .uploadDemoSrc({
                      demostrationContentses: urldbmediafiles,
                    })
                    .pipe(debounceTime(500))
                    .pipe(distinctUntilChanged())
                    .subscribe(
                      (res) => {
                        //back to table
                        console.log(
                          " Demosource Successfully uploaded : ",
                          res
                        );
                        //if (!this.isUpdate) {
                        var demosourceId = res.id;

                        //UPLOAD THE CONTENT WHEN SOURCE IS UPLOADED AND RETURN DATA.ID
                        setTimeout(() => {
                          observer.next(2);
                          this.contentService
                            .createDemoContent({
                              title: this._uploadForm.title.value,
                              subtitle: this._uploadForm.description.value,
                              coverImage: imgurl.dbPath,
                              demonstrationContentID: demosourceId,
                              categoryID: this._uploadForm.category.value.id,
                              author: this.currentUser,
                            })
                            .pipe(debounceTime(500))
                            .pipe(distinctUntilChanged())
                            .subscribe(
                              (res) => {
                                //back to table
                                //console.log("Successfully uploaded : ", res);
                                this.alertService.openSweetAlertToast(
                                  "success",
                                  "Uploaded sucessfully"
                                );
                                this.backwardbtn();
                              },
                              (error) => {
                                //this.error = error;
                                this.loading = false;
                                //this.alert = new BehaviorSubject<boolean>(true);
                                console.log(
                                  "Error trying to upload content : ",
                                  error
                                );
                                observer.error(error);
                              }
                            );

                          observer.complete();
                        }, 400);

                        //}
                      },
                      (error) => {
                        //this.error = error;
                        this.loading = false;
                        //this.alert = new BehaviorSubject<boolean>(true);
                        console.log("Error trying to upload content : ", error);
                        observer.error(error);
                      }
                    );
                }, 200);
              }

              //UPDATE DEMONSTRATION SOURCE ONLY ON PUT
              if (this.isUpdate) {
                if (this.selectedDemoSourceIDFromReceivedData !== undefined) {
                  observer.next(1);
                  this.contentService
                    .updateDemoSrc(
                      this.selectedDemoSourceIDFromReceivedData,
                      urldbmediafiles
                    )
                    .pipe(debounceTime(500))
                    .pipe(distinctUntilChanged())
                    .subscribe(
                      (res) => {
                        //back to table
                        console.log(" Demosource Successfully updated : ", res);
                        this.alertService.openSweetAlertToast(
                          "success",
                          "updated sucessfully"
                        );
                        observer.complete();
                        this.backwardbtn();
                      },
                      (error) => {
                        this.loading = false;
                        console.log(
                          "Error trying to update Demo source: ",
                          error
                        );
                        observer.error(error);
                        this.alertService.openSweetAlert(
                          "error",
                          "Please check your connection"
                        );
                      }
                    );
                }
              }
            }
          },
          (error) => {
            this.loading = false;
            console.log("Error trying to upload content video src : ", error);
            observer.error(error);
          }
        );
    });

    observable.subscribe({
      next: (x) => console.log("got value " + x),
      error: (err) => console.error("something wrong occurred: " + err),
      complete: () => console.log("done"),
    });
  }

  //UPDATE SOURCE
  getsourceToUpdate(source) {
    this.selectedSourceToUpdate = source;
    this.upSource = true;
    this.uploadContent(false, true);
  }

  //DELETE SOURCE
  deleteSource(source) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.contentService
          .deletesource(source.id)
          .pipe(debounceTime(500))
          .pipe(distinctUntilChanged())
          .subscribe(
            (data) => {
              console.log("Source DELETED Sucessfully!! ", data);
              for (let index = 0; index < this.demoContentsrc.length; index++) {
                if (this.demoContentsrc[index].title === source.title)
                  this.demoContentsrc.splice(index, 1);
              }
              this.alertService.openSweetAlertToast(
                "success",
                "Deleted sucessfully"
              );
            },

            (error) => {
              this.alertService.openSweetAlert(
                "error",
                "Please check your connection"
              );
              console.log("error trying to DELETE source", error);
            }
          );
      }
    });
  }

  //DELETE CONTENT
  deleteContent() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        var demosourceId = this.receiveSelectedData.demosourceID;

        //DELETE EACH SOURCE IN DB
        if (this.demoContentsrc.length !== 0) {
          this.demoContentsrc.forEach((el, index) => {
            this.contentService
              .deletesource(el.id)
              .pipe(debounceTime(500))
              .pipe(distinctUntilChanged())
              .subscribe(
                (data) => {
                  console.log("Source DELETED Sucessfully!! ", data);
                  this.demoContentsrc.splice(index);
                },

                (error) => {
                  console.log("error trying to DELETE source", error);
                }
              );
          });
        }

        //DELETE DEMOSOURCE
        this.contentService
          .deleteDemoSource(demosourceId)
          .pipe(debounceTime(500))
          .pipe(distinctUntilChanged())
          .subscribe(
            (data) => {
              console.log("DemoSource DELETED Sucessfully!! ", data);
            },

            (error) => {
              console.log("error trying to DELETE source", error);
            }
          );

        //DELETE CONTENT
        if (this.receiveSelectedData.id !== null)
          this.contentService
            .deleteDemoContent(this.receiveSelectedData.id)
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(
              (data) => {
                this.alertService.openSweetAlertToast(
                  "success",
                  "sucessfully Deleted"
                );
                this.backwardbtn();
              },
              (error) => {
                //this.alertService.openSweetAlertToast('success', 'sucessfully Deleted');
                this.backwardbtn();
                //this.alertService.openSweetAlert('error', 'Please check your connection')
              }
            );
      }
    });
  }

  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     //var img = this._sanitizer.bypassSecurityTrustResourceUrl(reader.result)
  //     this.imgURL = reader.result;
  //   }, false);

  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }

  // getImageFromService(imageurl) {
  //   //this.isImageLoading = true;
  //   this.contentService.getImage(imageurl).subscribe(data => {
  //     this.createImageFromBlob(data);
  //     //this.isImageLoading = false;
  //   }, error => {
  //     //this.isImageLoading = false;
  //     console.log(error);
  //   });
  // }

  closeAlert() {
    this.alert = new BehaviorSubject<boolean>(false);
  }

  backwardbtn() {
    this._location.back();
  }
  getAllCategories() {
    var _data: any;
    this.contentService
      .getCategory()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        (data) => {
          _data = data;
          this.categories = _data;
        },

        (error) => {
          console.log("error trying to get categories", error);
        }
      );
  }
}

class MediaContent {
  title: string;
  src: string;
}
