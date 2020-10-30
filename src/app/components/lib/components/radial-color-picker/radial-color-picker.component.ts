// tslint:disable-next-line:max-line-length
import { AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AnimationsMeta } from '../../helpers/animations';
import { hexToRgb, hslToHex, rgbToHsl, extractRGB, rgbToHex, extractHSL } from '../../helpers/color-functions';
import { renderColorMap } from '../../helpers/color-gradient';
import {fromEvent, merge, Observable, Subscription} from "rxjs";
import {Platform} from "@angular/cdk/platform";
import {filter, takeUntil, tap} from "rxjs/operators";
import {
  createPoint,
  determineCSSRotationAngle,
  isRightSemicircleSelected
} from "../../helpers/helpers";

export const RADIAL_COLOR_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadialColorPickerComponent),
  multi: true
};


enum RCPLifecycleEvents {
  show = 'show',
  shown = 'shown',
  selected = 'selected',
  hide = 'hide',
  hidden = 'hidden'
}

@Component({
  selector: 'app-radial-color-picker',
  templateUrl: './radial-color-picker.component.html',
  styleUrls: ['./radial-color-picker.component.scss'],
  providers: [RADIAL_COLOR_PICKER_VALUE_ACCESSOR],
})
export class RadialColorPickerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  public coefficient = 0.77;
  public hueValue = 266;
  public disabled = false;
  public active = false;
  public opacityRadialActive = false;

  public rect: ClientRect;

  public knobState = false;
  public gradientState = false;
  public opacityKnobState = false;
  public opacityGradientState = false;

  public dragging = false;
  public draggingOpacity = false;
  public mouseDownSub: Subscription;
  public mouseMoveSub: Subscription;

  private mouseUp$: Observable<any>;
  private mouseOut$: Observable<any>;

  public cancelEv: string;
  public mouseDownEv: string;
  public mouseMoveEv: string;
  public mouseUpEv: string;

  // @todo (agustin) change to currentHsl color to rgb
  private _value = 'FF0000';
  private defaultSize = 300;
  private gradientPlayer: AnimationPlayer;
  private knobPlayer: AnimationPlayer;
  private opacityGradientPlayer: AnimationPlayer;
  private opacityKnobPlayer: AnimationPlayer;

  private colorRotation: number = 0;

  @Input() public color: string;
  @Input() public colorType = 'hex';
  @Input() public size: number;
  @Input() public enterAnimation = true;
  @Input() public exitAnimation = true;
  @Input() public selectToChange = false;
  @Input() public collapsed = true;
  @Input() public collapsible = true;

  @Output() public selected = new EventEmitter();
  @Output() public colorChange = new EventEmitter();
  @Output() public opacityChange = new EventEmitter();
  @Output() public lifecycle = new EventEmitter();

  @ViewChild('canvas', { static: false, read: ElementRef }) public canvas: ElementRef;
  @ViewChild('knob', { static: false, read: ElementRef }) public knob: ElementRef;
  @ViewChild('opacityKnob', { static: false, read: ElementRef }) public opacityKnob: ElementRef;

  // @todo (agustin) check
/*  @ViewChild('colorRotator', { static: false, read: ElementRef }) public colorRotator: ElementRef;
  @ViewChild('opacityRotator', { static: false, read: ElementRef }) public opacityRotator: ElementRef;*/



  public get isExplicit() {
    return coerceBooleanProperty(this.selectToChange);
  }

  public get hasEnterAnimation() {
    return coerceBooleanProperty(this.enterAnimation);
  }

  public get hasExitAnimation() {
    return coerceBooleanProperty(this.exitAnimation);
  }

  public get isCollapsible() {
    return coerceBooleanProperty(this.collapsible);
  }
  public get isCollapsed() {
    return coerceBooleanProperty(this.collapsed);
  }

  public get getSize() {
    return this.size ? this.size : this.defaultSize;
  }

  set value(value: any) {
    let val = value;
    if (value) {
      if (value instanceof Object) {
        val = value.value;
      }
      this._value = val;
      if (val.includes('#')) {
        this._value = val.substring(1);
        const rgb = hexToRgb(this._value);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        this.hueValue = hsl.hue;
      } else if (val.includes('rgb')) {
        const color = extractRGB(val);
        const hsl = rgbToHsl(color.r, color.g, color.b);
        this._value = rgbToHex(color.r, color.g, color.b);
        this.hueValue = hsl.hue;
      } else if (val.includes('hsl')) {
        const color = extractHSL(val);
        this._value = hslToHex(color.h, 100, 50);
        this.hueValue = color.h;
      }
    }

    if (!this.isExplicit) {
      this.notifyValueChange();
    }
  }

  get value() {
    return '#' + this._value;
  }

  @HostBinding('style.width.px') get width() {
    return this.size ? this.size : this.defaultSize;
  }

  @HostBinding('style.height.px') get height() {
    return this.size ? this.size : this.defaultSize;
  }

  onChange: (value) => {};
  onTouched: () => {};

  notifyValueChange() {
    if (this.onChange) {
      let color;
      const rgb = hexToRgb(this._value);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      switch (this.colorType) {
        case 'hex':
          color = '#' + this._value;
          break;
        case 'rgb':
          color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          break;
        case 'hsl':
          color = `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.luminosity}%)`;
          break;
        default:
          color = '#' + this._value;
      }

      this.onChange(color);
    }
  }

  writeValue(obj: any): void {
    // console.log(obj);
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
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
    const rgb = hexToRgb(this._value);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    this.hueValue = hsl.hue;
    this.configureEventListeners()
  }

  configureEventListeners() {
    // @todo (agustin) try to replace with up element
    const opacityKnobNativeElement = this.el.nativeElement.querySelector('#opacityRotator')
    this.mouseUp$ = fromEvent(opacityKnobNativeElement, this.mouseUpEv, { passive: true });
    this.mouseOut$ = fromEvent(opacityKnobNativeElement, this.cancelEv, { passive: true });

    this.configureRotationListenersForElement(opacityKnobNativeElement)
  }

  configureRotationListenersForElement(element) {
  //  requestAnimationFrame(this.initialRender.bind(this));
    this.mouseUp$ = fromEvent(element, this.mouseUpEv, { passive: true })
    this.mouseOut$ = fromEvent(element, this.cancelEv, { passive: true });

    this.mouseDownSub = fromEvent(element, this.mouseDownEv, { passive: true })
      .pipe(
        filter((val) => {
          return this.active;
        })
      )
      .subscribe((downEvent) => {
        this.dragging = true;
        const elementRect = element.getBoundingClientRect();
        const point = createPoint(downEvent, elementRect);
        this.draggingOpacity = isRightSemicircleSelected(point);
        this.applyRotation(point);

        this.mouseMoveSub = fromEvent(element, this.mouseMoveEv).pipe(
          takeUntil(merge(this.mouseOut$, this.mouseUp$).pipe(
            tap((upEvent) => {
              this.mouseMoveSub.unsubscribe();
            })
          ))
        ).subscribe((moveEvent: MouseEvent) => {
          const elementRect = element.getBoundingClientRect()
          const point = createPoint(moveEvent, elementRect);
          this.applyRotation(point);
        });
      });

    this.mouseUp$.subscribe((upEvent) => {
      this.dragging = false
    });
  }

  applyRotation (point) {
    const { rotation, colorAngle } = determineCSSRotationAngle(point);
    const isOpacitySemiCircleSelected = isRightSemicircleSelected(point)

    if(this.draggingOpacity && isOpacitySemiCircleSelected) {
      this.onRotateOpacity(rotation)
    } else if(!this.draggingOpacity && !isOpacitySemiCircleSelected) {
      this.onRotateColor(rotation, colorAngle)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.color && changes.color.currentValue) {
      this.value = changes.color.currentValue;
    }
    if (changes.size && changes.size.currentValue) {
      this.recalculateKnobPosition();
      this.recalculateOpacityKnobPosition();
    }
  }

  ngAfterViewInit() {
    this.recalculateKnobPosition();
    this.recalculateOpacityKnobPosition();
    this.rect = this.el.nativeElement.getBoundingClientRect();
    const mapRadius = this.getSize;
    renderColorMap(this.canvas.nativeElement, mapRadius);
    if (this.isCollapsed) {
      this.introAnimation();
      this.introAnimationOpacity();
    }
  }

  public open() {
    this.introAnimation();
    this.introAnimationOpacity();
  }

  public close() {
    this.outroAnimation();
  }

  public introAnimation() {
    this.lifecycle.emit(RCPLifecycleEvents.show);
    this.gradientState = true;
    this.createPlayerForGradient();
    this.gradientPlayer.onDone(() => {
      this.knobState = true;
      this.createPlayerForKnob();
      this.knobPlayer.onDone(() => {
        this.active = true;
        this.lifecycle.emit(RCPLifecycleEvents.shown);
      });
      if (this.hasEnterAnimation) {
        this.knobPlayer.play();
      } else {
        this.knobPlayer.finish();
      }
    });

    if (this.hasEnterAnimation) {
      this.gradientPlayer.play();
    } else {
      this.gradientPlayer.finish();
    }
  }

  public introAnimationOpacity() {
    this.lifecycle.emit(RCPLifecycleEvents.show);
    this.opacityGradientState = true;
    this.createPlayerForOpacityGradient();
    this.opacityGradientPlayer.onDone(() => {
      this.opacityKnobState = true;
      this.createPlayerForKnobGradient();
      this.opacityKnobPlayer.onDone(() => {
        this.opacityRadialActive = true;
        this.lifecycle.emit(RCPLifecycleEvents.shown);
      });
      if (this.hasEnterAnimation) {
        this.opacityKnobPlayer.play();
      } else {
        this.opacityKnobPlayer.finish();
      }
    });

    if (this.hasEnterAnimation) {
      this.opacityGradientPlayer.play();
    } else {
      this.opacityGradientPlayer.finish();
    }
  }

  public outroAnimation() {
    this.lifecycle.emit(RCPLifecycleEvents.hide);
    this.knobState = false;
    this.createPlayerForKnob();
    this.knobPlayer.onDone(() => {
      this.gradientState = false;
      this.createPlayerForGradient();
      this.gradientPlayer.onDone(() => {
        this.active = false;
        this.lifecycle.emit(RCPLifecycleEvents.hidden);
      });
      if (this.hasExitAnimation) {
        this.gradientPlayer.play();
      } else {
        this.gradientPlayer.finish();
      }
    });
    if (this.hasExitAnimation) {
      this.knobPlayer.play();
    } else {
      this.knobPlayer.finish();
    }
  }

  /**
   *
   * @param rotationAngle goes from 180 (bottom) to 360
   * @param colorRotation goes from 0 (bottom) to 360
   */
  public onRotateColor(rotationAngle, colorRotation) {
    console.log("onRotateColor", colorRotation)
    const hex = hslToHex(colorRotation, 100, 50);
    this.colorRotation = colorRotation
    this.value = hex;

    const mapRadius = this.getSize;
    renderColorMap(this.canvas.nativeElement, mapRadius, this.colorRotation, this.coefficient);

    const colorKnobNativeElement = this.el.nativeElement.querySelector('#colorRotator')
    this.renderer.setStyle(colorKnobNativeElement, 'transform', `rotate(${rotationAngle}deg)`);
    if (!this.isExplicit) {
      this.colorChange.emit(`#${hex}`);
    }
  }

  /**
   *
   * @param opacityRotation goes from 360 to 180 (starts from the bottom opposite to the color
   */
  public onRotateOpacity(opacityRotation) {
    console.log("onRotate opacity", opacityRotation)
    // This percent goes from 0 to 100 but we need to convert it from 0 to 50
    const lightnessPercent = Math.abs((opacityRotation - 360) * 100 / 360)
    const hex = hslToHex(this.colorRotation, 100, lightnessPercent);
    this.value = hex;

    const opacityKnobNativeElement = this.el.nativeElement.querySelector('#opacityRotator')
    this.renderer.setStyle(opacityKnobNativeElement, 'transform', `rotate(${opacityRotation}deg)`);
    if (!this.isExplicit) {
      this.colorChange.emit(`#${hex}`);
    }
  }

  public recalculateKnobPosition() {
    const radius = (this.getSize / 2);
    const innerCircle = radius * this.coefficient;
    const areaSize = radius - innerCircle;
    if (this.knob) {
      const knobRect = this.knob.nativeElement.getBoundingClientRect();
      const knobPosition = radius - (areaSize / 2 + innerCircle) - knobRect.width / 2;
      this.renderer.setStyle(this.knob.nativeElement, 'top', knobPosition + 'px');
    }
  }

  public recalculateOpacityKnobPosition() {
    const radius = (this.getSize / 2);
    const innerCircle = radius * this.coefficient;
    const areaSize = radius - innerCircle;

    if (this.opacityKnob) {
      const knobRect = this.opacityKnob.nativeElement.getBoundingClientRect();
      // The knob should be on the opposite ring
      const knobPosition = radius + (areaSize / 2 + innerCircle) - knobRect.width / 2;
      this.renderer.setStyle(this.opacityKnob.nativeElement, 'top', knobPosition + 'px');
    }
  }

  public confirmColor($event) {
    // console.log('confirm color', $event);
    if (!this.isCollapsible) {
      this.selected.emit($event.color);
      this.lifecycle.emit(RCPLifecycleEvents.selected);
      this.notifyValueChange();
      return;
    }

    // is color picker collapsed
    if (this.knobState) {
      this.selected.emit($event.color);
      this.lifecycle.emit(RCPLifecycleEvents.selected);
      this.notifyValueChange();
      this.outroAnimation();
    } else {
      this.introAnimation();
      this.introAnimationOpacity();
    }
  }

  public createPlayerForGradient() {
    if (this.gradientPlayer) {
      this.gradientPlayer.destroy();
    }
    let animationFactory;

    if (this.gradientState) {
      animationFactory = this.animationBuilder
        .build(AnimationsMeta.gradientAnimationEnter);
    } else {
      animationFactory = this.animationBuilder
        .build(AnimationsMeta.gradientAnimationExit);
    }

    this.gradientPlayer = animationFactory.create(this.canvas.nativeElement);
  }

  public createPlayerForOpacityGradient() {
    if (this.opacityGradientPlayer) {
      this.opacityGradientPlayer.destroy();
    }
    let animationFactory;

    if (this.opacityGradientState) {
      animationFactory = this.animationBuilder
        .build(AnimationsMeta.gradientAnimationEnter);
    } else {
      animationFactory = this.animationBuilder
        .build(AnimationsMeta.gradientAnimationExit);
    }

    this.opacityGradientPlayer = animationFactory.create(this.canvas.nativeElement);
  }

  public createPlayerForKnob() {
    if (this.knobPlayer) {
      this.knobPlayer.destroy();
    }
    let animationFactory;

    if (this.knobState) {
      animationFactory = this.animationBuilder
        .build(AnimationsMeta.knobAnimationEnter);
    } else {
      animationFactory = this.animationBuilder
        .build(AnimationsMeta.knobAnimationExit);
    }

    this.knobPlayer = animationFactory.create(this.knob.nativeElement);
  }

  public createPlayerForKnobGradient() {
    if (this.opacityKnobPlayer) {
      this.opacityKnobPlayer.destroy();
    }
    let animationFactory;

    if (this.opacityKnobState) {
      animationFactory = this.animationBuilder
        .build(AnimationsMeta.knobAnimationEnter);
    } else {
      animationFactory = this.animationBuilder
        .build(AnimationsMeta.knobAnimationExit);
    }

    this.opacityKnobPlayer = animationFactory.create(this.opacityKnob.nativeElement);
  }

  ngOnDestroy() {
    if (this.knobPlayer) {
      this.knobPlayer.destroy();
    }
    if (this.gradientPlayer) {
      this.gradientPlayer.destroy();
    }
    // console.log('color picker destroy');
  }
}

