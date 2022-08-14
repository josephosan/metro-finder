import { MatComponentsModule } from './mat-components.module';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from './services/data.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputLabelComponent } from './input-label/input-label.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExplanationComponent } from './explanation/explanation.component';
import { HttpClientModule } from '@angular/common/http';
import { SuccessResultComponent } from './success-result/success-result.component';
import { LinkComponent } from './link/link.component';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    AppComponent,
    InputLabelComponent,
    ExplanationComponent,
    SuccessResultComponent,
    LinkComponent,
    MapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatComponentsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
