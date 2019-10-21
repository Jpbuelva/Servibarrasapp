import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modalnovedad',
  templateUrl: './modalnovedad.component.html',
  styleUrls: ['./modalnovedad.component.css']
})
export class ModalnovedadComponent   {

  public toppings = new FormControl();
  constructor(public dialogRef: MatDialogRef<ModalnovedadComponent>,    
              @Inject(MAT_DIALOG_DATA) public data) {
              }

}
