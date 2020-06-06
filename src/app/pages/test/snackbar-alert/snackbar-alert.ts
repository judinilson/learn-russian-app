import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-snackbar-alert',
  templateUrl: './snackbar-alert.html',
  styleUrls: ['./snackbar-alert.scss']
})
export class SnackbarAlertComponent implements OnInit {
    _new = false;
    _continue = false;
    message: any;
    constructor(
        public dialogRef: MatDialogRef<SnackbarAlertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {}
    
     
     
     
    
   
    continue(): void {
       this._continue = !this._continue
       var _data = {
           'continue': this._continue
       }
       this.dialogRef.close(
          _data
       );
    }

    newTraining() {
        this._new = !this._new
        var _data = {
            'new': this._new
        }
        this.dialogRef.close(
            _data
        );
    }

  ngOnInit() {
    console.log('data received', this.data);
    this.message = this.data && this.data.message;
  }
}
