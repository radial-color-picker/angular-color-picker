import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { fromEvent, Observable, Subscription, merge } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { calculateQuadrant, determineCSSRotationAngle } from '../helpers/helpers';

@Directive({
  selector: '[rcpRotatable]'
})
export class RotatableDirective implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  public rotation: any;
  public dragging = false;
  public mouseDownSub: Subscription;
  public mouseMoveSub: Subscription;
  public mouseUpSub: Subscription;
  public rect: any;

  public cancelEv: string;
  public mouseDownEv: string;
  public mouseMoveEv: string;
  public mouseUpEv: string;

  @Input() angle: number;
  @Input() disable: boolean;
  @Input() active: boolean;

  get isDisabled() {
    return this.disable ? coerceBooleanProperty(this.disable) : false;
  }

  @Output() public rotateStart = new EventEmitter<any>();
  @Output() public rotating = new EventEmitter<any>();
  @Output() public rotateStop = new EventEmitter<any>();

  private point: any;
  private mouseUp$: Observable<any>;
  private mouseOut$: Observable<any>;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private platform: Platform
  ) {
    if (this.platform.IOS || this.platform.ANDROID) {
      this.mouseDownEv = 'touchstart';
      this.mouseUpEv = 'touchend';
      this.mouseMoveEv = 'touchmove';
      this.cancelEv = 'touchcancel';
    } else {
      this.mouseDownEv = 'mousedown';
      this.mouseUpEv = 'mouseup';
      this.mouseMoveEv = 'mousemove';
      this.cancelEv = 'mouseout';
    }

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.angle && changes.angle.currentValue) {
      // console.log(changes.angle.currentValue);
      const angle = changes.angle.currentValue + 90;
      this.renderer.setStyle(this.el.nativeElement, 'transform', `rotate(${angle}deg)`);
    }
  }

  ngAfterViewInit() {
    // console.log(this.isDisabled);
    requestAnimationFrame(this.initialRender.bind(this));
    this.rect = this.el.nativeElement.getBoundingClientRect();
    this.mouseUp$ = fromEvent(this.el.nativeElement, this.mouseUpEv, { passive: true });
    this.mouseOut$ = fromEvent(this.el.nativeElement, this.cancelEv, { passive: true });

    this.mouseDownSub = fromEvent(this.el.nativeElement, this.mouseDownEv, { passive: true })
      .pipe(
        filter((val) => {
          return this.active && !this.isDisabled;
        })
      )
      .subscribe((downEvent) => {
        this.dragging = true;
        this.rect = this.el.nativeElement.getBoundingClientRect();
        // console.log('mouse down', downEvent, this.rect);
        this.point = this.createPoint(downEvent);
        this.rotateStart.emit(this.point);
        this.applyRotation();


        this.mouseMoveSub = fromEvent(this.el.nativeElement, this.mouseMoveEv).pipe(
          takeUntil(merge(this.mouseOut$, this.mouseUp$).pipe(
            tap((upEvent) => {
              this.rect = this.el.nativeElement.getBoundingClientRect();
              // console.log('mouse up', upEvent, this.rect);
              this.dragging = false;
              this.mouseMoveSub.unsubscribe();
              this.rotateStop.emit(this.point);
            })
          ))
        ).subscribe((moveEvent: MouseEvent) => {
          this.rect = this.el.nativeElement.getBoundingClientRect();
          // console.log('mouse move', moveEvent, this.rect);

          this.point = this.createPoint(moveEvent);
          // console.log(this.point);
          this.applyRotation();
        });
      });
  }

  public initialRender() {
    const angle = this.angle + 90;
    this.renderer.setStyle(this.el.nativeElement, 'transform', `rotate(${angle}deg)`);
  }

  public rotationRender() {
    // console.log(this.rotation);
    this.renderer.setStyle(this.el.nativeElement, 'transform', `rotate(${this.rotation}deg)`);
  }

  ngOnDestroy() {
    if (this.mouseDownSub) {
      this.mouseDownSub.unsubscribe();
    }
    if (this.mouseMoveSub) {
      this.mouseMoveSub.unsubscribe();
    }
    if (this.mouseUpSub) {
      this.mouseUpSub.unsubscribe();
    }
    // console.log('directive destroy');
  }



  private applyRotation() {
    const quadrant = calculateQuadrant(this.point);
    const rotation = determineCSSRotationAngle(this.point, quadrant);
    // console.log(rotation);
    this.rotating.emit(rotation);
    this.rotation = rotation;
    requestAnimationFrame(this.rotationRender.bind(this));

  }

  private createPoint(mouseEvent) {
    let point;
    if (mouseEvent.targetTouches) {
      point = {
        x: this._normalizeX(mouseEvent.targetTouches[0].clientX),
        y: this._normalizeY(mouseEvent.targetTouches[0].clientY)
      };
    } else {
      point = {
        x: this._normalizeX(mouseEvent.clientX),
        y: this._normalizeY(mouseEvent.clientY)
      };
    }
    // console.log('point', point);
    return point;
  }

  private _normalizeX(coordX) {
    return coordX - this.rect.left - this.rect.width / 2;
  }

  private _normalizeY(coordY) {
    return ((coordY - this.rect.top) * -1) + this.rect.height / 2;
  }

}
