import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface UsersData {
  name: string;
  id: number;
}
@Component({
  selector: 'app-dialog-boxx',
  templateUrl: './dialog-boxx.component.html',
  styleUrls: ['./dialog-boxx.component.css']
})
 

  export class DialogBoxComponent {
    action: string;
    local_data: any;
    constructor(private dialog: MatDialog ) {
 
    }
    openConfirmDialog(){
      
    }
  }


