import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dialog-user-teacher',
  templateUrl: './dialog-user-teacher.html',
  styleUrls: ['./dialog-user-teacher.scss']
})
export class DialogUserTeacherComponent implements OnInit {

    userdata: any;
    createUserForm:  FormGroup;
    submited = false;
    updateUserForm: FormGroup;
    alert = new Observable<boolean>();
    invalidUpdateForm = false;
    wrongPassword = false;
    constructor(
      private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogUserTeacherComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {}
    
     
     
     
    


  ngOnInit() {
    this.userdata = this.data && this.data.data;
    console.log('data received',  this.data );
    //console.log('firstname:',this.data.item.user.firstName);

    if(this.data.createUser){
      this.createUserForm = this.formBuilder.group({
        firstname: ['',[Validators.required]],
        lastname: ['',[Validators.required]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required,Validators.minLength(8)]],
        country: [null,[Validators.required]],
        group: [null,[Validators.required]],
      });
    }
    



    if(this.data.updateUser){
      this.updateUserForm = this.formBuilder.group({
        firstname: [this.data.item.user.firstName],
        lastname: [this.data.item.user.lastName],
        username: [this.data.item.user.username],
        group: [null],
        oldpassword: ['', [Validators.required, Validators.minLength(8)]],
        newpassword: ['', [Validators.minLength(8)]]
  
      });
    }
   
  }

  controlHasError(controlName){
    return Boolean(this.createUserForm.controls[controlName].errors)
  }
   // convenience getter for easy access to form fields
   get createform() { return this.createUserForm.controls; }
   get updateform() {return this.updateUserForm.controls}

  submit(){
    this.submited = true;
    if(this.data.createUser === true){
      if(!this.createUserForm.invalid){
        this.dialogRef.close({
          firstname: this.createform.firstname.value,
          lastname: this.createform.lastname.value,
          username:this.createform.username.value,
          password: this.createform.password.value,
          country: this.createform.country.value,
          groupId: this.createform.group.value.id
        })
      }
    }

    if(this.data.updateUser){
      if(!this.updateUserForm.invalid){

        var password = '';
        var groupId = 0;
        if(this.data.item.user.password !== this.updateform.oldpassword.value){
          this.wrongPassword = true;
          this.alert = new BehaviorSubject<boolean>(true);
            
        }else{

          if(this.updateform.newpassword.value !== ''){
            password = this.updateform.newpassword.value;
          }else{
            password = this.updateform.oldpassword.value;
          }

        }

        
        if(!this.wrongPassword ){
          if(this.updateform.group.value !== null){
            groupId = this.updateform.group.value.id
          }
          this.dialogRef.close({
            userId: this.data.item.user.id,
            firstname: this.updateform.firstname.value,
            lastname: this.updateform.lastname.value,
            username:this.updateform.username.value,
            groupId: groupId,
            oldGroupId: this.data.item.user.teacherGroupId,
            password: password,
          })
        }

      }else{
        this.wrongPassword = false;

        this.alert = new BehaviorSubject<boolean>(true);
        this.invalidUpdateForm = true;
      }
    }
    
    
  }


  closeAlert(){
    this.wrongPassword = false;
    this.alert = new BehaviorSubject<boolean>(false);
    this.invalidUpdateForm = false;
  }

}
