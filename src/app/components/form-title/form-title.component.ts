import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.css'],
})
export class FormTitleComponent implements OnInit {
  @Input('buttonDisabled') buttonDisabled: boolean = true;
  @Input('title') title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
