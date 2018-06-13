import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngmodel',
  templateUrl: './ngmodel.component.html',
  styleUrls: ['./ngmodel.component.scss']
})
export class NgmodelComponent implements OnInit {
  color = '#ff0000';
  constructor() { }

  ngOnInit() {
  }

  modelChange($event) {
    console.log('model change', $event);
  }

}
