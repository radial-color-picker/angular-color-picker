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

export const RADIAL_COLOR_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadialColorPickerComponent),
  multi: true
};

let nextUniqueId = 0;
const rgbRegex = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
const hslRegex = /hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
enum RCPLifecycleEvents {
  show = 'show',
  shown = 'shown',
  selected = 'selected',
  hide = 'hide',
  hidden = 'hidden'
}

@Component({
  selector: 'rcp-radial-color-picker',
  templateUrl: './radial-color-picker.component.html',
  styleUrls: ['./radial-color-picker.component.scss'],
  providers: [RADIAL_COLOR_PICKER_VALUE_ACCESSOR],
})
export class RadialColorPickerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  protected _uid = `rcp-${nextUniqueId++}`;

  public coefficient = 0.77;
  public hueValue = 266;
  public disabled = false;
  public active = false;

  public rect: ClientRect;

  public knobState = false;
  public gradientState = false;

  private _value = 'FF0000';
  private defaultSize = 300;
  private gradientPlayer: AnimationPlayer;
  private knobPlayer: AnimationPlayer;

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
  @Output() public lifecycle = new EventEmitter();

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

      // console.log('set value hue', this.hueValue);
    }

    if (!this.isExplicit) {
      this.notifyValueChange();
    }
  }

  get value() {
    let color = this._value;

    color = '#' + this._value;
    return color;
  }

  @ViewChild('canvas', { static: false, read: ElementRef }) public canvas: ElementRef;
  @ViewChild('knob', { static: false, read: ElementRef }) public knob: ElementRef;
  @ViewChild('rotator', { static: false, read: ElementRef }) public rotator: ElementRef;

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
      let color = this.value;
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
    private animationBuilder: AnimationBuilder
  ) {

  }

  ngOnInit() {
    const rgb = hexToRgb(this._value);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    this.hueValue = hsl.hue;
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    if (changes.color && changes.color.currentValue) {
      this.value = changes.color.currentValue;
    }
    if (changes.size && changes.size.currentValue) {
      this.recalculateKnobPosition();
    }
  }

  ngAfterViewInit() {
    this.recalculateKnobPosition();
    this.rect = this.el.nativeElement.getBoundingClientRect();
    // console.log(this.rect);
    renderColorMap(this.canvas.nativeElement, this.getSize);
    // console.log(this.collapsed);
    if (this.isCollapsed) {
      this.introAnimation();
    }
  }

  public open() {
    this.introAnimation();
  }

  public close() {
    this.outroAnimation();
  }

  public introAnimation() {
    this.lifecycle.emit(RCPLifecycleEvents.show);
    this.gradientState = true;
    this.createPlayerForGradient(this.hasEnterAnimation);
    this.gradientPlayer.onDone(() => {
      this.knobState = true;
      this.createPlayerForKnob(this.hasEnterAnimation);
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

  public onRotate(rotation) {
    const hex = hslToHex(this.angleToHue(rotation), 100, 50);
    this.value = hex;
    // console.log('on rotate', this.isExplicit);
    if (!this.isExplicit) {
      this.colorChange.emit(`#${hex}`);
    }
  }

  public angleToHue(rotation) {
    return rotation - 90;
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
    }
  }

  public createPlayerForGradient(hasAnimation = true) {
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

  public createPlayerForKnob(hasAnimation = true) {
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

