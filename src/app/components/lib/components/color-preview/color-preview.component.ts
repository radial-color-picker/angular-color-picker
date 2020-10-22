// tslint:disable-next-line:max-line-length
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit, Output, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Animations } from '../../helpers/animations';

@Component({
  selector: 'rcp-color-preview',
  templateUrl: './color-preview.component.html',
  styleUrls: ['./color-preview.component.scss'],
  animations: [
    Animations.rippleAnimation,
    Animations.buttonAnimation
  ]
})
export class ColorPreviewComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  public background: SafeStyle;

  public rippleState: any;
  public buttonState: any;

  public relation: number;

  @Input() coefficient: number;
  @Input() color: string;
  @Input() size: number;

  @Output() confirm = new EventEmitter<any>();

  @HostBinding('style.width') get width() {
    return (this.size && this.size < 200) ? '36px' : '70px';
  }

  @HostBinding('style.height') get height() {
    return (this.size && this.size < 200) ? '36px' : '70px';
  }

  @HostListener('click') onClick() {
    this.buttonState = {
      value: true,
      params: {
        scale: this.relation
      }
    };
    this.rippleState = {
      value: true,
      params: {
        scale: this.relation
      }
    };


  }

  constructor(
    private sanitizer: DomSanitizer,
    private el: ElementRef
  ) {


  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // console.log(this.size);
    const rect = this.el.nativeElement.getBoundingClientRect();
    const innerCircle = this.size * this.coefficient;
    this.relation = innerCircle / rect.width;
    // console.log('relation', relation);
  }

  ngOnChanges(changes) {
    if (changes.color && changes.color.currentValue) {
      this.background = this.sanitizer.bypassSecurityTrustStyle(this.color);
    }
  }

  public rippleAnimationDone($event) {
    // console.log($event);
    if ($event.toState) {
      this.rippleState = false;
      this.confirm.emit({
        color: this.color
      });
    }
  }

  public buttonAnimationDone($event) {
    // console.log($event);
    if ($event.toState) {
      this.buttonState = false;
    }
  }

  ngOnDestroy() {
    // console.log('color preview destroy');
  }
}
