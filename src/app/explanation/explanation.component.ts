import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.css']
})
export class ExplanationComponent implements OnInit {
  explanation: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: string 
    , private matDialogRef: MatDialogRef<ExplanationComponent>) {
    this.explanation = data;
  }

  ngOnInit(): void {
  }

  onUndrestandClick() {
    this.matDialogRef.close();
  }

}
