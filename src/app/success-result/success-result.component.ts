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
  responseValue: any;
  googlePathUrl: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, 
  private matDialogRef: MatDialogRef<SuccessResultComponent>) {
    try {
      this.responseValue = data;

      this.metroStation = data.myData.nearestStation.name;
      this.motorcycleTime = data.neshanData.motorcycle.rows[0].elements[0].duration.text;
      this.carTime = data.neshanData.car.rows[0].elements[0].duration.text;
      this.distance = data.neshanData.motorcycle.rows[0].elements[0].distance.text;
    } catch(err) {
      console.log(err);
    }
  }

  ngOnInit(): void {
    this.makePathUrl();
  }

  // click events:
  onUndrestandClick() {
    this.matDialogRef.close();
  }


  makePathUrl() {
    try {
      if(!this.responseValue) {
        console.log('There is no response to use!');
      } else {
        // console.log(this.responseValue.neshanData.car.origin_addresses[0]);
        // console.log(this.responseValue.neshanData.car.destination_addresses[0]);

        let originAddress = this.responseValue.neshanData.car.origin_addresses[0];
        let destinationAddress = this.responseValue.myData.nearestStation.coordinate;

        this.googlePathUrl = `https://www.google.com/maps/dir/${originAddress}/${destinationAddress}/data=!4m2!4m1!3e2`
      }
    } catch(err) {
      console.log(err);
    }
  }

}
