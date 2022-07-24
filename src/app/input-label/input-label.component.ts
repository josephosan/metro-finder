import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-label',
  templateUrl: './input-label.component.html',
  styleUrls: ['./input-label.component.css']
})
export class InputLabelComponent implements OnInit {
  @Input() type: string = '';
  @Input() placeholder: string = '';


  constructor() { }

  ngOnInit(): void {
  }

}
