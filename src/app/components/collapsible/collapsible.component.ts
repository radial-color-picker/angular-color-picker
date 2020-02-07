import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent implements OnInit {

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
