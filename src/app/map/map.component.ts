import { ExplanationComponent } from './../explanation/explanation.component';
import { SuccessResultComponent } from './../success-result/success-result.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<SuccessResultComponent>,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCloseClick() {
    this.matDialogRef.close();
  }

  onUsageClick() {
    this.matDialog.open(ExplanationComponent, {
      data: `نحوه استفاده:

      اول وارد یک برنامه تو گوشیتون میشید، (اینجا پیشفرض گوگل مپس در نظر گرفته میشه) حالا هر مکانی رو که می‌خواید انتخاب کنید و روش نگه دارید تا انتخاب بشه، اگه به بالای صفحه دقت کنید مختصات رو می‌بینید که به صورت یکسری عدد، که با کاما از هم جدا شدن هست؛
      حالا اونو کپی کنید(روش یبار بزنید تا باز بشه بعد کپی کنید) و قرار بدید تو سایت. 
      به همین راحتی🤝.`,
      width: "30rem",
      panelClass: 'background-color-changer'
    });
  }
}
