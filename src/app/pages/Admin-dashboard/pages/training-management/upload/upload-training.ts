import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { AlertService } from "src/app/shared/service/alert.service";
import { ContentService } from "src/app/shared/service/content.service";
import Swal from "sweetalert2";
import { Location } from "@angular/common";
import { Editor, toHTML, toDoc, Toolbar } from "ngx-editor";
import { schema } from "ngx-editor/schema";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatAccordion } from "@angular/material/expansion";
import { TrainingTestService } from "src/app/shared/service/training-test.service";

@Component({
  selector: "upload-training",
  templateUrl: "./upload-training.html",
  styleUrls: ["./upload-training.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UploadTrainingTaskComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  uploadTrainingForm: FormGroup;
  imagePath;
  imgURL: any;
  message: string;
  imagdbUrl: any;
  imageUpload: boolean;
  formDataCoverImg: FormData;
  receiveSelectedData: any;
  isUpdate = false;
  uploadbtn = "";
  isQuery: boolean = false;
  alert = new Observable<boolean>();
  categories: any;
  submit = false;
  selectedIDFromReceivedData: any;
  selectedcategory: any;
  loading = false;
  dloading = false;
  addQuestionCount = 0;
  editor: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"],
  ];
  currentUser: string;

  constructor(
    //private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private trainingService: TrainingTestService,
    private _location: Location,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getAllCategories();

    //CURRENT USER
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.currentUser = `${currentUser.firstName} ${currentUser.lastName}`;

    this.isQuery = true;

    this.trainingService.currenttrainingSelectedData.subscribe((x) => {
      this.receiveSelectedData = x;
    });
    this.uploadTrainingForm = new FormGroup({
      title: new FormControl(""),
      category: new FormControl(null),
      questionFormArray: new FormArray([this.initQuestionForm()]),
    });

    if (this.receiveSelectedData === null) {
      this.editor = new Editor();
      this.uploadTrainingForm = new FormGroup({
        title: new FormControl(""),
        category: new FormControl(null),
        questionFormArray: new FormArray([this.initQuestionForm()]),
      });
      this.uploadbtn = "СОХРАНИТЬ";
    }
  }

  ngAfterViewInit(): void {
    this.editor = new Editor();
    var observable = new Observable((observer) => {
      observer.next(1);

      this.trainingService.currenttrainingSelectedData.subscribe((x) => {
        this.receiveSelectedData = x;
      });

      if (this.receiveSelectedData !== null) {
        observer.next(2);

        this.isUpdate = true;
        this.uploadbtn = "ОБНОВИТЬ";

        console.log(this.receiveSelectedData);
        if (
          this.receiveSelectedData !== null ||
          this.receiveSelectedData !== undefined
        ) {
          this.selectedIDFromReceivedData = this.receiveSelectedData.id;

          setTimeout(() => {
            observer.next(3);
            this.getAllCategories();
            if (this.categories != undefined) {
              observer.next(3);
              var cat = this.categories.filter((x) => {
                return x.id === this.receiveSelectedData.category.id;
              });
              this.selectedcategory = cat[0];
            } else {
              console.log(this.categories);
            }

            //COVER IMAGE
            if (this.receiveSelectedData.thumb !== null) {
              var https = "https://";
              var thumburl = this.receiveSelectedData.thumb.includes(https)
                ? this.receiveSelectedData.thumb
                : https + this.receiveSelectedData.thumb;
              this.imgURL = thumburl;
            }
          }, 400);
          observer.next(4);
          this.isQuery = true;
          this.uploadTrainingForm = new FormGroup({
            title: new FormControl(this.receiveSelectedData.title),
            category:
              this.selectedcategory !== undefined
                ? new FormControl(this.selectedcategory.name)
                : new FormControl(""),
            questionFormArray: new FormArray(this.updateInitQuestionsForm()),
          });
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

    this.cdr.detectChanges();
  }

  initQuestionForm() {
    return new FormGroup({
      questions: new FormControl("", Validators.required),
      answerformarray: new FormArray([this.initAnswerForm()]),
    });
  }

  //INIT QUESTION UPDATE FORMS
  updateInitQuestionsForm() {
    var trainingArray = this.receiveSelectedData.training;
    var initQuestionsArray = [];

    trainingArray.forEach((element, index) => {
      const question = element.questions.find((x) => x !== undefined);

      //Adding new instance with value
      const init = new FormGroup({
        questions: new FormControl(question, Validators.required),
        answerformarray: new FormArray(
          this.updateInitAnswerForm(element.answers)
        ),
      });
      setTimeout(() => {
        this.newEditorInstance();
        initQuestionsArray.push(init);
      }, 400);
    });

    this.isQuery = false;
    return initQuestionsArray;
  }

  newEditorInstance() {
    this.editor = new Editor();
  }

  initAnswerForm() {
    return new FormGroup(
      {
        answers: new FormControl("", Validators.required),
        state: new FormControl(false),
      },
      atLeastOneStateSlideCheckedValidator()
    );
  }

  //INIT ANSWERS UPDATE FORMS
  updateInitAnswerForm(ansArray) {
    var initAnswers;
    initAnswers = [];

    for (let index = 0; index < ansArray.length; index++) {
      initAnswers.push(
        new FormGroup(
          {
            answers: new FormControl(
              ansArray[index].answers,
              Validators.required
            ),
            state: new FormControl(ansArray[index].state),
          },
          atLeastOneStateSlideCheckedValidator()
        )
      );
    }

    return initAnswers;
  }

  getQuestionsForm(form) {
    //console.log(form.get('sections').controls);
    return form.controls.questionFormArray.controls;
  }
  getAnswersForm(form) {
    //console.log(form.controls.questions.controls);
    return form.controls.answerformarray.controls;
  }

  get uploadform() {
    return this.uploadTrainingForm.controls;
  }

  // UPLOAD IMAGE AND PREVIEW
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

  //ADD CONTENT
  //UPLOAD DATA
  uploadData() {
    this.submit = true;
    this.loading = true;

    if (!this.isUpdate) {
      if (!this.uploadTrainingForm.invalid) {
        var imgurl: any;

        if (this.imagePath !== undefined) {
          this.contentService
            .uploadCoverImage(this.formDataCoverImg)
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(
              (res) => {
                imgurl = res;
                console.log("image upload successfully: ", imgurl);
                if (res !== null) this.uploadTrainingContent(imgurl.dbPath);
              },
              (error) => {
                this.loading = false;
                console.error(
                  "Error trying to upload content image cover : ",
                  error
                );
              }
            );
        }
      } else {
        console.error("Form Error");
      }
    } else {
      if (!this.uploadTrainingForm.invalid) {
        var imgurlToUpdate: any;

        if (this.imagePath !== undefined) {
          console.log(this.imagePath);
          console.log("continue update ");
          this.contentService
            .uploadCoverImage(this.formDataCoverImg)
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(
              (res) => {
                imgurlToUpdate = res;
                console.log("image upload successfully: ", imgurlToUpdate);
                if (res !== null)
                  this.updateTrainingContent(imgurlToUpdate.dbPath);
              },
              (error) => {
                this.loading = false;
                console.error(
                  "Error trying to upload content image cover : ",
                  error
                );
              }
            );
        } else {
          // if image is no updated
          imgurlToUpdate = this.receiveSelectedData.thumb;
          this.updateTrainingContent(imgurlToUpdate);
        }
      } else {
        console.error("Form Error");
      }
    }
  }

  //upload trainig content
  uploadTrainingContent(imgurl) {
    var title = this.uploadform.title.value;
    var categoryId = this.uploadform.category.value.id;
    var trainingArr = this.uploadform.questionFormArray.value;

    var trainings: TrainingsData[] = [];
    for (let index = 0; index < trainingArr.length; index++) {
      const question = [trainingArr[index].questions];
      const answers = trainingArr[index].answerformarray;
      console.log(answers);

      //var _answers = { answer: answers.answer, state: answers.state };
      var training = { questions: question, answers: answers };

      trainings.push(training);
    }

    console.info(trainings);
    this.trainingService
      .upploadTrainingContent({
        categoryId: categoryId,
        title: title,
        trainings: trainings,
        author: this.currentUser,
        answerTypes: 1,
        coverImage: imgurl,
      })
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        (res) => {
          this.alertService.openSweetAlertToast(
            "success",
            "успешно Загружено "
          );
          this.backwardbtn();
        },
        (error) => {
          console.log("Error trying to upload content : ", error);
          this.loading = false;
        }
      );
  }

  //update traininig content
  updateTrainingContent(imgurl) {
    var title = this.uploadform.title.value;
    var catg: any;

    var _categoryId = this.receiveSelectedData.category.id;

    catg =
      this.uploadform.category.value.id === undefined ||
      this.uploadform.category.value.id === _categoryId
        ? this.receiveSelectedData.category.id
        : this.uploadform.category.value.id;

    //this add and remve ate the same time is just to update questionFormArray so we can get the values on it
    this.addQuestion();
    this.removelastQuestion();
    var trainingArr = this.uploadform.questionFormArray.value;

    if (this.selectedIDFromReceivedData !== undefined) {
      var trainings: TrainingsData[] = [];

      for (let index = 0; index < trainingArr.length; index++) {
        const question = [trainingArr[index].questions];
        const answers = trainingArr[index].answerformarray;

        var training = { questions: question, answers: answers };

        trainings.push(training);
      }

      console.log(trainings);
      var _t = this.receiveSelectedData.training;
      this.trainingService
        .updateTrainingContent(this.selectedIDFromReceivedData, {
          categoryId: catg,
          title: title,
          trainings: trainings,
          author: this.currentUser,
          answerTypes: 1,
          coverImage: imgurl,
        })
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(
          (res) => {
            this.alertService.openSweetAlertToast(
              "success",
              "Успешно загружено"
            );
            this.backwardbtn();
          },
          (error) => {
            console.log("Error trying to update content : ", error);
            this.loading = false;
          }
        );
    } else {
      console.log("selected Id is udefined");
    }
  }
  //DELETE
  deleteTraining() {
    this.dloading = true;
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
        //DELETE training
        if (this.receiveSelectedData.id !== null) {
          this.trainingService
            .deleteTrainingContent(this.receiveSelectedData.id)
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(
              (res) => {
                this.alertService.openSweetAlertToast(
                  "success",
                  "Успешно загружено"
                );
                this.backwardbtn();
              },
              (error) => {
                this.alertService.openSweetAlert(
                  "error",
                  "Пожалуйста, проверьте ваше соединение"
                );
                console.log("Error trying to update content : ", error);
                this.dloading = false;
              }
            );
        }
      }
    });
  }

  //ADD QUESTION
  addQuestion() {
    this.editor = new Editor();
    console.log(this.editor);
    //this.addQuestionCount += 1
    const control = this.uploadTrainingForm.get(
      "questionFormArray"
    ) as FormArray;
    control.push(this.initQuestionForm());
  }

  //remove last from formarray
  removelastQuestion() {
    const control = this.uploadTrainingForm.get(
      "questionFormArray"
    ) as FormArray;

    if (control.length > 0) {
      control.removeAt(control.length - 1);
    }
  }
  removeatQuestion(index) {
    const control = this.uploadTrainingForm.get(
      "questionFormArray"
    ) as FormArray;

    control.removeAt(index);
  }
  //ADD ANSWERS
  addanswer(question) {
    const control = question.get("answerformarray") as FormArray;
    control.push(this.initAnswerForm());
  }

  //CLOSE ALERT MESSAGE
  closeAlert() {
    this.alert = new BehaviorSubject<boolean>(false);
  }

  //BACK TO THE TABLE BUTTON
  backwardbtn() {
    this._location.back();
  }

  //GET CATEGORY
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

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}

export function atLeastOneStateSlideCheckedValidator(
  minRequired = 1
): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    let checked = 0;

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];

      if (control.value) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}

class Answer {
  answers: string;
  state: boolean;
}
export class TrainingsData {
  questions: any;
  answers: Answer;
}
