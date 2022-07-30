import { ExplanationComponent } from './../explanation/explanation.component';
import { SuccessResultComponent } from './../success-result/success-result.component';
import { LinkService } from './../services/link.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  errField: string = '';
  doneProc: string = 'done';


  constructor(private matDialogRef: MatDialogRef<LinkComponent>,
      private linkService: LinkService,
      private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  metroForm = new FormGroup({
    link: new FormControl('',
      Validators.required)
  });


  onSubmit(data: FormGroup) {
    this.doneProc = '';
    this.errField = '';
    console.log(data.value);
    this.linkService.postData(data.value).subscribe(
      (res) => {
        this.matDialog.open(SuccessResultComponent, {
          data: res,
          width: "30rem"
        });

        this.doneProc = 'done';
        this.matDialogRef.close();
      },
      (err) => {
        this.errField = err.message;
        this.doneProc = 'done';

        if(err.status === 400) {
          this.errField = 'لینک صحیح نیست!';
        } else {
          this.errField = 'خطای سرور داخلی!';
        }
        console.log(err);
      }
    )
  }

  onCloseClick() {
    this.matDialogRef.close();
  }

  onWhyClick() {
    this.matDialog.open(ExplanationComponent, {
      data: `وقتی من لینکو میگیرم، سمت سرور، ی ریکوست به اون لینک میدم و از جوابی که بهم میده با یک روش عجیب و غریبی! مختصاتو از توش برمیدارم.

      حالا، وقتی شما از اپلیکیشن گوگل مپس استفاده میکنید، لینکی که گوگل بهتون میده متفاوته از زمانی که از وبسایت استفاده میکنید. و جالب اینجاست که گوگل به این ریکوست جواب نمیده مگر اینکه وارد یک اکانت شده باشید(خیلی مسخره ست مگه نه؟ گوگلِ دلقک🤡) و اینجا دیگه نمیشه گوگلو دور زد.
      
      حالا اگه ایده ای دارید حتما اینجا 👇 با من درمیون بذارید🤝
      josephosan.info (contact)`,
      width: "30rem"
    })
  }
}
