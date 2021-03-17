import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({  
    selector: 'app-dialog-user-teacher',
    templateUrl: './category-dialog.html',
    // styleUrls: ['./category-dialog.scss']
})
export class DialogCategoryComponent implements OnInit {

    userdata: any;
    createCategoryForm: FormGroup;
    submited = false;
    updateCategoryForm: FormGroup;
    alert = new Observable<boolean>();
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogCategoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }







    ngOnInit() {
        this.userdata = this.data && this.data.data;
        console.log('data received', this.data);
        //console.log('firstname:',this.data.item.user.firstName);

        if (this.data.create) {
            this.createCategoryForm = this.formBuilder.group({
                name: ['', [Validators.required]],
            });
        }




        if (this.data.update) {
            this.updateCategoryForm = this.formBuilder.group({
                name: [this.data.category.name],

            });
        }

    }


    // convenience getter for easy access to form fields
    get createform() { return this.createCategoryForm.controls; }
    get updateform() { return this.updateCategoryForm.controls }

    submit() {
        this.submited = true;
        if (this.data.create === true) {
            if (!this.createCategoryForm.invalid) {
                this.dialogRef.close({
                    name: this.createform.name.value,
                })
            }
        }

        if (this.data.update) {
            if (!this.updateCategoryForm.invalid) {


                this.dialogRef.close({
                    id: this.data.category.id,
                    name: this.updateform.name.value,

                })


            } else {

                this.alert = new BehaviorSubject<boolean>(true);
            }
        }


    }


    closeAlert() {
        this.alert = new BehaviorSubject<boolean>(false);
    }

}
