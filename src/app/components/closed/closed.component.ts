import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.scss']
})
export class ClosedComponent implements OnInit {

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
