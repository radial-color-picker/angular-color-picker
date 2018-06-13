import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public selectColor(color) {
    console.log('select color', color);
  }

  public rtpHook($event) {
    console.log(`radial color picker lifecycle event: ${$event}`);
  }

  public colorChange($event) {
    console.log(`colorChange event: ${$event}`);
  }
}
