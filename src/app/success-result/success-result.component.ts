import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-result',
  templateUrl: './success-result.component.html',
  styleUrls: ['./success-result.component.css']
})
export class SuccessResultComponent implements OnInit {
  metroStation: string = '';
  motorcycleTime: string = '';
  carTime: string = '';
  distance: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, 
  private matDialogRef: MatDialogRef<SuccessResultComponent>) {
    try {
      this.metroStation = data.myData.nearestStation.name;
      this.motorcycleTime = data.neshanData.motorcycle.rows[0].elements[0].duration.text;
      this.carTime = data.neshanData.car.rows[0].elements[0].duration.text;
      this.distance = data.neshanData.motorcycle.rows[0].elements[0].distance.text;
    } catch(err) {
      console.log(err);
    }
  }

  ngOnInit(): void {
  }

  // click events:
  onUndrestandClick() {
    this.matDialogRef.close();
  }

}
