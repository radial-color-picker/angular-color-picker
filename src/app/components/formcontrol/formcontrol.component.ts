import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-formcontrol',
  templateUrl: './formcontrol.component.html',
  styleUrls: ['./formcontrol.component.scss']
})
export class FormcontrolComponent implements OnInit, OnDestroy {
  colorCtrl: FormControl;
  colorSub: Subscription;
  constructor() {
    this.colorCtrl = new FormControl('#ff0000');
  }

  ngOnInit() {
    this.colorSub = this.colorCtrl.valueChanges.pipe(startWith(null)).subscribe((value) => {
      console.log(value);
    });

  }

  ngOnDestroy() {
    this.colorSub.unsubscribe();
  }

}
