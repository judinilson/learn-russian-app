import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-user-student',
  templateUrl: './dialog-user-student.html',
  styleUrls: ['./dialog-user-student.scss']
})
export class DialogUserStudentComponent implements OnInit {

    userdata: any;
    constructor(
        public dialogRef: MatDialogRef<DialogUserStudentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {}
    
     
     
     
    


  ngOnInit() {
    this.userdata = this.data && this.data.data;
    console.log('data received',  this.userdata );
  }
}
