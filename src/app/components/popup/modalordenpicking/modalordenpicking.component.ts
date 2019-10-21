import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modalordenpicking',
  templateUrl: './modalordenpicking.component.html',
  styleUrls: ['./modalordenpicking.component.css']
})
export class ModalordenpickingComponent   {

  public toppings = new FormControl();
  constructor(public dialogRef: MatDialogRef<ModalordenpickingComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
              }

}
