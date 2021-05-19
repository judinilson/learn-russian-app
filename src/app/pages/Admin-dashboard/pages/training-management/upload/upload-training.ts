import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { AlertService } from "src/app/shared/service/alert.service";
import { ContentService } from "src/app/shared/service/content.service";
import Swal from "sweetalert2";
import { Location } from '@angular/common';
import { Editor, toHTML, toDoc, Toolbar } from 'ngx-editor';
import { schema } from 'ngx-editor/schema';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatAccordion } from "@angular/material/expansion";
import { TrainingTestService } from "src/app/shared/service/training-test.service";






@Component({
    selector: 'upload-training',
    templateUrl: './upload-training.html',
    styleUrls: ['./upload-training.scss'],
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
    receiveSelectedData: any
    isUpdate = false;
    uploadbtn = '';
    isQuery: boolean = false;
    alert = new Observable<boolean>();
    categories: any;
    submit = false;
    selectedIDFromReceivedData: any;
    selectedcategory: any;
    loading = false;
    dloading = false
    addQuestionCount = 0
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
    // QuestionForm = new FormGroup({
    //     question: new FormControl(''),
    //     answerformarray: new FormArray([])
    // });
    // questionFormArray = new FormArray([])
    // answerformarraycontrols = new FormArray([])


    constructor(
        //private _ngZone: NgZone,
        private formBuilder: FormBuilder,
        private contentService: ContentService,
        private trainingService: TrainingTestService,
        private _location: Location,
        private alertService: AlertService,
    ) {

    }

    ngOnInit() {
        this.isQuery = true
        this.editor = new Editor();
        var observable = new Observable(observer => {

            observer.next(1)
            this.getAllCategories();

            this.trainingService.currenttrainingSelectedData.subscribe(
                x => {
                    this.receiveSelectedData = x

                })
            this.uploadTrainingForm = new FormGroup({
                title: new FormControl(''),
                category: new FormControl(null),
                questionFormArray: new FormArray([this.initQuestionForm()])
            })

            if (this.receiveSelectedData === null) {
                observer.next(2)
                this.uploadTrainingForm = new FormGroup({
                    title: new FormControl(''),
                    category: new FormControl(null),
                    questionFormArray: new FormArray([this.initQuestionForm()])
                })
                this.uploadbtn = 'SAVE'
                this.isQuery = false
            } else {
                observer.next(2)

                this.isUpdate = true;
                this.uploadbtn = 'UPDATE'

                console.log(this.receiveSelectedData);
                if (this.receiveSelectedData !== null || this.receiveSelectedData !== undefined) {
                    this.selectedIDFromReceivedData = this.receiveSelectedData.id

                    setTimeout(() => {
                        if (this.categories != undefined) {
                            observer.next(3)
                            this.selectedcategory = this.categories.filter(x => {
                                return x.id === this.receiveSelectedData.category.id
                            })
                        }


                        //COVER IMAGE
                        if (this.receiveSelectedData.thumb !== null) {
                            var https = 'https://'
                            var thumburl = this.receiveSelectedData.thumb.includes(https) ? this.receiveSelectedData.thumb : https + this.receiveSelectedData.thumb
                            this.imgURL = thumburl
                        }


                        observer.next(4);
                        this.uploadTrainingForm = new FormGroup({
                            title: new FormControl(this.receiveSelectedData.title),
                            category: this.selectedcategory !== undefined ? new FormControl(this.selectedcategory[0].name) : new FormControl(''),
                            questionFormArray: new FormArray(this.initQuestionForm())
                        })



                        //this.demoContentsrc = this.receiveSelectedData.demosource.demostrationContentses
                    }, 400);
                }
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

    initQuestionForm() {

        var initQuestionsArray

        if (this.isUpdate) {
            var trainingArray = this.receiveSelectedData.training
            initQuestionsArray = []


            trainingArray.forEach(element => {
                this.editor = new Editor();
                const question = element.questions.find(x => x !== undefined)
                console.log(question)
                const init = new FormGroup({
                    questions: new FormControl(question, Validators.required),
                    answerformarray: new FormArray(this.initAnswerForm(element.answers))
                })
                initQuestionsArray.push(init)
            })





            return initQuestionsArray

        } else {

            return new FormGroup({
                questions: new FormControl('', Validators.required),
                answerformarray: new FormArray([this.initAnswerForm()])
            });




        }

    }

    initAnswerForm(ansArray?) {
        var initAnswers

        if (this.isUpdate) {
            initAnswers = []
            for (let index = 0; index < ansArray.length; index++) {
                initAnswers.push(new FormGroup({
                    answer: new FormControl(ansArray[index].answers, Validators.required),
                    state: new FormControl(ansArray[index].state,)
                }, atLeastOneStateSlideCheckedValidator()))

            }
            return initAnswers

        } else {

            return new FormGroup({
                answer: new FormControl('', Validators.required),
                state: new FormControl(false,)
            }, atLeastOneStateSlideCheckedValidator())

        }


    }

    getQuestionsForm(form) {
        //console.log(form.get('sections').controls);
        return form.controls.questionFormArray.controls;
    }
    getAnswersForm(form) {
        //console.log(form.controls.questions.controls);
        return form.controls.answerformarray.controls;
    }


    get uploadform() { return this.uploadTrainingForm.controls }



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

    //ADD CONTENT
    //UPLOAD DATA 
    uploadData() {
        this.submit = true;
        this.loading = true;

        if (!this.isUpdate) {
            if (!this.uploadTrainingForm.invalid) {
                console.info("We start uploading data")
                var imgurl: any;

                if (this.imagePath !== undefined) {
                    this.contentService.uploadCoverImage(
                        this.formDataCoverImg
                    )
                        .pipe(debounceTime(500))
                        .pipe(distinctUntilChanged())
                        .subscribe(
                            res => {
                                imgurl = res;
                                console.log('image upload successfully: ', imgurl)
                                if (res !== null) this.uploadTrainingContent(imgurl.dbPath)
                            },
                            error => {
                                this.loading = false
                                console.error("Error trying to upload content image cover : ", error)
                            }
                        )
                }
            } else {
                console.error("Form Error")
            }
        }
    }


    uploadTrainingContent(imgurl) {
        var date = new Date()
        var title = this.uploadform.title.value
        var categoryId = this.uploadform.category.value.id
        var trainingArr = this.uploadform.questionFormArray.value

        var trainings:TrainingsData[] = []
        for (let index = 0; index < trainingArr.length; index++) {
            const question = [trainingArr[index].questions]
            const answers = trainingArr[index].answerformarray
            console.log(answers)
            var _answer = answers.answer
            var _state = answers.state
            var _answers = {answer: _answer,state: _state}
            var training = { questions: question, answers: _answers }

            trainings.push(training)

        }
        
        console.info(trainings)
       setTimeout(() => {})
        this.trainingService.upploadTrainingContent({
            categoryId: categoryId,
            title: title,
            trainings: trainings,
            author: "Production",
            answerTypes: 1,
            coverImage: imgurl
        })
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(
                res => {
                    this.alertService.openSweetAlertToast('success', 'Uploaded sucessfully');
                    this.backwardbtn();
                },
                error => {
                    console.log("Error trying to upload content : ", error);
                }
            )

    }


    //DELETE 
    deleteTraining() {
        console.log(
            "delete btn"
        )
    }


    //ADD QUESTION
    addQuestion() {
        this.editor = new Editor();
        //this.addQuestionCount += 1
        const control = this.uploadTrainingForm.get('questionFormArray') as FormArray
        control.push(this.initQuestionForm())


    }
    //ADD ANSWERS
    addanswer(question) {
        const control = question.get('answerformarray') as FormArray
        control.push(this.initAnswerForm())


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



export function atLeastOneStateSlideCheckedValidator(
    minRequired = 1
): ValidatorFn {
    return function validate(formGroup: FormGroup) {
        let checked = 0

        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.controls[key]

            if (control.value) {
                checked++
            }
        })

        if (checked < minRequired) {
            return {
                requireCheckboxToBeChecked: true,
            }
        }

        return null
    }
}

class Answer{
    answer:string
    state:boolean
}
export class TrainingsData {
    questions:any
    answers:Answer
}