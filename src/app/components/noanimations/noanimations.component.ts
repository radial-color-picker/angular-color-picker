import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noanimations',
  templateUrl: './noanimations.component.html',
  styleUrls: ['./noanimations.component.scss']
})
export class NoanimationsComponent implements OnInit {

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
