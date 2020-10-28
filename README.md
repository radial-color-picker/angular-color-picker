# Angular Radial Color Picker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

<p align="center">
  <img width="250" src="https://raw.githubusercontent.com/radial-color-picker/angular-color-picker/HEAD/screenshots/thumbnail.png" alt="screenshot">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@radial-color-picker/angular-color-picker">
      <img src="https://img.shields.io/npm/dm/@radial-color-picker/angular-color-picker.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/@radial-color-picker/angular-color-picker">
      <img src="https://img.shields.io/npm/v/@radial-color-picker/angular-color-picker.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/@radial-color-picker/angular-color-picker">
      <img src="https://img.shields.io/npm/l/@radial-color-picker/angular-color-picker.svg" alt="License">
  </a>
</p>

## Introduction

Great UX starts with two basic principles - ease of use and simplicity. Selecting a color should be as easy as moving a slider, clicking a checkbox or pressing a key just like other basic form elements behave.

This is a flexible and elegant material-ish design color picker. Developed with mobile devices in mind. Key features:
* Supports touch devices
* Angular animations

This component doesn't have feature parity with
it's [predecessor](https://github.com/talamaska/angular-radial-color-picker) for Angular 1.x

The component is developed so it can be used with template-driven or reactive form, or as a simple component.

## Quick Links

* [Usage](#usage)
* [Inputs](#inputs)
* [Outputs](#outputs)
* [Instance methods](#instance-methods)
* [Lifecycle events](#lifecycle)

* [FAQ](#questions)
* [Contribute](#contributing)


## <a name="usage">Usage</a>

Color Picker on [npm](https://www.npmjs.com/package/@radial-color-picker/angular-color-picker)
```bash
npm install -S @radial-color-picker/angular-color-picker
```

In your app module or any module that will hold the components that are using the radial color picker:

```typescript
import { RadialColorPickerModule } from 'radial-color-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RadialColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

and in your component template
```html
<app-rcp-radial-color-picker></app-rcp-radial-color-picker>
```

more examples can be found in the app in this repository

## <a name="inputs">Inputs</a>
`<app-rcp-radial-color-picker>` component has several inputs, all of which are optional.

| Options       | Type   | Default/Description |
|------------|--------|---------|
| `selectToChange`    | Boolean | prevents propagation of on change on FormControl or NgModel on rotation. Defaults to false: <br> `false`. |
| `collapsed`    | Boolean | should the initial render be collapsed/open state of the color picker. Defaults to true: <br> `true`. |
| `collapsible`    | Boolean | Should color select trigger hiding of the color palette. Defaults to true: <br> `true`. |
| `enterAnimation`    | Boolean | flag to turn on/off intro animations. Defaults to true: <br> `true`. |
| `exitAnimation`    | Boolean | flag to turn on/off outro animations. Defaults to true: <br> `true`. |
| `size`    | String | pixel size of diameter. Defaults to 300: <br> `300`. |
| `colorType`    | String | format of color to be emitted by the component. Defaults to hex: <br> `hex`. |
| `color`    | String | hex, rgb or hsl code of your color. Defaults to red: <br> `#FF0000`. |

[Back To Top](#user-content-quick-links)


## <a name="outputs">Outputs</a>
`<app-rcp-radial-color-picker>` component has several outputs, all of which are optional.

| Options       | Type   | Default/Description |
|------------|--------|---------|
| `selected` | Function | Callback which is triggered when a color is selected. |
| `colorChange` | Function | Callback which is triggered when color is changed (i.e. on rotation). |
| `lifecycle` | Function | Callback which is triggered when component state is changed. |

[Back To Top](#user-content-quick-links)


## <a name="lifecycle">Lifecycle Events</a>

Emitted by the lifecycle Output

| Name       | Description |
|------------|-------------|
| `show` | Fires when the color picker is about to show and **before** any animation is started. |
| `shown` | Fires when the color picker is shown and has finished animating. |
| `selected` | Fires when a color is selected via the middle selector. Event is fired right before `hide`. |
| `hide` | Fires when the color picker is about to hide and **before** any animation is started. |
| `hidden` | Fires when the color picker is hidden and has finished animating. |

[Back To Top](#user-content-quick-links)


## <a name="instance-methods">Instance methods</a>
| Name       | Description |
|------------|-------------|
| `open` | Programatically opens the color picker if it's not already opened. |
| `close` | Programatically closes the color picker if it's not already closed. |


[Back To Top](#user-content-quick-links)


## <a name="questions">First Asked Questions</a>

<details>
    <summary>Color picker uses <code>hex</code>. How can I use other formats like <code>rgb()</code> or hsl?</summary>
    <p>The color picker will recognize the format of the input, but will still work internally with hex value of the provided color. You can change the output format by setting the colorType property to <code>hex</code>, <code>rgb</code> or <code>hsl</code></p>
</details>

<details>
    <summary>How to select other shades of the solid colors?</summary>
    <p>We suggest to add a custom slider for saturation and luminosity or use <code>&lt;input type="range"&gt;</code>.</p>
</details>

<details>
    <summary>How can I change the active color of the picker after initialization?</summary>
    <p><code>rcp-radial-color-picker</code> component uses <code>OnChanges lifecycle hook</code> to detect changes of the color binding. When using
    <code>&lt;rcp-radial-color-picker [color]="color"&gt;&lt;/rcp-radial-color-picker&gt;</code>
</details>
<br>

[Back To Top](#user-content-quick-links)

## Contribute
If you're interested in the project you can help out with feature requests, bugfixes, documentation improvements or any other helpful contributions. You can use the issue list of this repo for bug reports and feature requests and as well as for questions and support.

We are also particularly interested in projects you did with this plugin. If you have created something colorful and creative with the color picker and want to show it off send us a quick mail.

The project is using an adapted version of [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-angular/convention.md) and commit messages should adhere to it.

[Back To Top](#user-content-quick-links)
