import { MapComponent } from './map/map.component';
import { LinkService } from './services/link.service';
import { LinkComponent } from './link/link.component';
import { SuccessResultComponent } from './success-result/success-result.component';
import { CoordinatesService } from './services/coordinates.service';
import { ExplanationComponent } from './explanation/explanation.component';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'metro-finder';
  errField: string = '';
  doneProc: string = 'done';
  countUsers: string = '';
  countLinks: string = '';
  usersGeoLocation: string = '';
  inputValue: string = '';

  ngOnInit(): void {
    this.countUsersInDataBase();
    this.countLinksInDataBase();

    this.getUserLocation();
    this.isLoaded();
  }

  constructor(private matDialog: MatDialog
            , private coordinateService: CoordinatesService
            , private LinkService: LinkService) {
  }

  isLoaded() {
    window.addEventListener("load", function (event) {
      return event.returnValue;
    });
  }

  // metro form:
  metroForm = new FormGroup({
    coordinate: new FormControl()
  });

  // getting form data: 
  get coordinate() {
    return this.metroForm.get('coordinate');
  }

  // click events:
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

  onWhyClick() {
    this.matDialog.open(ExplanationComponent, {
      data: `اصلا چرا باید از این برنامه استفاده کنم؟

      خب، فرض کنید، به شما یک لکیشن دادن و میخواد به یک جایی توی تهران برید، و به یک سری از دلایل مثل طرح ترافیک یا شلوغی تهران نمیخواید از ماشین استفاده کنید و نتیجه میگیرید که استفاده از مترو سریعترین راهه. اینجاست که این برنامه به کمکتون میاد. کافیه با هر برنامه ای که دوست دارید(مثلا گوگل مپس) مختصات اون جایی که هستین رو تو این سایت وارد کنید و «محاسبه کن» رو بزنید، و حالا این برنامه نزدیکترین ایستگاه مترو رو به همراه یسری اطلاعات دیگه بهتون میگه😁.
      
      خب چرا از گوگل مپس استفاده نکنم برای این کار؟ 
      
      اولا گوگل مپس به طور مستقیم یک همچین چیزی نداره، یعنی شما باید بدونید به چه ایستگاهی می‌خواین برین و این برنامه اینو بهتون میگه🙃🙂
      دوماً شما ایرانی هستین خب یکم حمایت کنین😑`,
      width: "30rem",
      panelClass: 'background-color-changer'
    });
  }

  onContactClick() {
    this.matDialog.open(ExplanationComponent, {
      data: `برای ارتباط با من به این جیمیل پیام بدین
      josephosan1381@gmail.com
      یا با این ایدی تو تلگرام منو پیدا کنین
      josephosan@`,
      width: "30rem",
      panelClass: 'background-color-changer'
    });
  }

  onApiClick() {
    this.matDialog.open(ExplanationComponent, {
      data: `در این برنامه از یک Api به نام metro-finder استفاده شده که رایگان هم هست، در این Api مختصات همه مترو های تهران به صورت decimal در دسترس عموم هست. برای اطلاعات بیشتر به <a href="https://github.com/josephosan/metro-finder-api">LINK</a> مراجعه کنید.`,
      width: "30rem",
      panelClass: 'background-color-changer'
    });
  }

  onVPNClick() {
    this.matDialog.open(ExplanationComponent, {
      data: `پول نداریم سرور بگیریم😤، از سرورهای رایگان خارجی استفاده میکنیم که فیلترن😑.`,
      width: "30rem",
      panelClass: 'background-color-changer'
    });
  }

  onLinkClick() {
    this.matDialog.open(LinkComponent, {
      width: "30rem"
    });
    this.countLinksInDataBase();
  }


  // submit button:
  onSubmit(data: FormGroup) {
    this.errField = '';
    this.doneProc = '';
    let dataToSend = data.value;
    if(this.inputValue) {
      dataToSend = {
        coordinate: this.inputValue
      }
    }
    this.coordinateService.postData(dataToSend).subscribe(
      (res) => {
        this.usersGeoLocation = '';
        this.inputValue = '';
        this.doneProc = 'done';
        this.matDialog.open(SuccessResultComponent, {
          data: res,
          width: "30rem"
        });
        
        data.reset();
        this.countUsersInDataBase();
      },
      (err) => {
        console.log(err);
        this.doneProc = 'done';
        if(err.status === 400) {
          this.errField = 'با الگو همخوانی ندارد!';
        } else if(err.status === 500) {
          this.errField = 'خطای سرور داخلی!'
        }
      }
    )
  }

  onMapClick() {
    this.matDialog.open(MapComponent, {
      width: "30rem"
    });
  }

  onLocationClick() {
    this.getUserLocation();
  }


  // get some data:
  countUsersInDataBase() {
    this.coordinateService.getSpecificData('count?onlyCount=true').subscribe(
      (res: any) => {
        this.countUsers = res.count;
      }, 
      (err) => {
        console.log(err);
      }
    )
  }

  countLinksInDataBase() {
    this.LinkService.getSpecificData('count?onlyCount=true').subscribe(
      (res: any) => {
        this.countLinks = res.count;
      }, 
      (err) => {
        console.log(err);
      }
    )
  }

  getUserLocation() {
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        if(lat > 50 || lon > 70 || lon < 0) {
          console.log('Cannot calculate; user out of range.   ' + 'lat: ' + lat + ', lon: ' + lon);
          this.usersGeoLocation = '';
          this.inputValue = '';
          this.timeOutLocaiton();
        } else {
          this.usersGeoLocation = lat+','+lon;
          this.inputValue = this.usersGeoLocation;
          this.timeOutLocaiton();
        }
      })
    }, 1000);
  }

  timeOutLocaiton() {
    setTimeout(() => {
      if(this.usersGeoLocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          let lat = pos.coords.latitude;
          let lon = pos.coords.longitude;
  
          if(lat > 50 || lon > 70 || lon < 0) {
            console.log('Cannot calculate; user out of range.   ' + 'lat: ' + lat + ', lon: ' + lon);
            this.usersGeoLocation = '';
            this.inputValue = '';
          } else {
            this.usersGeoLocation = lat+','+lon;
          }
        });
        this.timeOutLocaiton();
      } else {
        console.log('stoping location rendering.');
      }
    }, 5000);
  }
}
