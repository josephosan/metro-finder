import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  exports: [
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class MatComponentsModule { }
