import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-group-dialog',
  templateUrl: './user-group-dialog.html',
  styleUrls: ['./user-group-dialog.scss']
})
export class DialogUserGroupComponent implements OnInit {

  userdata: any;
  createGroupForm: FormGroup;
  submited = false;
  updateGroupForm: FormGroup;
  alert = new Observable<boolean>();
  invalidUpdateForm = false;
  wrongPassword = false;
  defaultTime: any;
  defaultTeacher: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogUserGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }







  ngOnInit() {
    this.userdata = this.data && this.data.data;
    console.log('data received', this.data);
    //console.log('firstname:',this.data.item.user.firstName);

    if (this.data.createGroup) {
      this.createGroupForm = this.formBuilder.group({
        groupname: ['', [Validators.required]],
        teacher: [null, [Validators.required]],
        teachingtime: [null, [Validators.required]]
      });
    }




    if (this.data.updateGroup) {
      this.updateGroupForm = this.formBuilder.group({
        groupname: [this.data.item.group.name],
        teacher: [null, ],
        teachingtime: [null]

      });

      //for update
    this.defaultTime = this.data.item.teachingTime
    this.defaultTeacher = this.data.item.teacher.username
    }


  }


  // convenience getter for easy access to form fields
  get createform() { return this.createGroupForm.controls; }
  get updateform() { return this.updateGroupForm.controls }

  submit() {
    this.submited = true;
    if (this.data.createGroup === true) {
      if (!this.createGroupForm.invalid) {
        this.dialogRef.close({
          groupname: this.createform.groupname.value,
          teacher: this.createform.teacher.value,
          teachingtime: this.createform.teachingtime.value
        })
      }
    }

    if (this.data.updateGroup) {
      if (!this.updateGroupForm.invalid) {

        var teacherId = 0
        var teachingTime
        if(this.updateform.teacher.value === null) teacherId = this.data.item.teacher.id
        else teacherId = this.updateform.teacher.value.id

        if(this.updateform.teachingtime.value === null) teachingTime = this.data.item.teachingTime
        else teachingTime= this.updateform.teachingtime.value.substring(0,5)

        this.dialogRef.close({
          groupname: this.updateform.groupname.value,
          teacherid: teacherId,
          teachingtime: teachingTime
        })


      } 
    }


  }


  closeAlert() {
    this.wrongPassword = false;
    this.alert = new BehaviorSubject<boolean>(false);
    this.invalidUpdateForm = false;
  }

}
