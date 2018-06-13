# Angular Color Picker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

<p align="center"><img width="250" src="./screenshots/thumbnail.png" alt="screenshot"></p>

## Introduction

Great UX starts with two basic principles - ease of use and simplicity. Selecting a color should be as easy as moving a slider, clicking a checkbox or pressing a key just like other basic form elements behave.

This is a flexible and elegant material-ish design color picker. Developed with mobile devices and keyboard usage in mind. Key features:
* Supports touch devices
* Angular animations

## Quick Links

* [Usage](#usage)
* [Inputs](#inputs)
* [Outputs](#outputs)
* [Instance methods](#instance-methods)
* [Lifecycle events](#lifecycle)

* [FAQ](#questions)
* [Contribute](#contributing)


## <a name="usage">Usage</a>

#### With Module Build System
Color Picker on [npm](https://www.npmjs.com/package/@radial-color-picker/angular-color-picker)
```bash
npm install -S @radial-color-picker/angular-color-picker
```

And in your app module or any module that will hold the component that are using the radial color picker:

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

## <a name="inputs">Inputs</a>
`<rcp-radial-color-picker>` component has several inputs, all of which are optional.

| Options       | Type   | Default/Description |
|------------|--------|---------|
| `selectToChange`    | Boolean | prevents propagation of on change on FormControl or NgModel on rotation. Defaults to false: <br> `false`. |
| `collapsed`    | Boolean | should the initial render be collapsed/open state of the color picker. Defaults to true: <br> `true`. |
| `collapsible`    | Boolean | Should color select trigger hiding of the color palette. Defaults to true: <br> `true`. |
| `enterAnimation`    | Boolean | flag to turn on/off intro animations. Defaults to true: <br> `true`. |
| `exitAnimation`    | Boolean | lag to turn on/off outro animations. Defaults to true: <br> `true`. |
| `size`    | String | pixel size of diameter. Defaults to 300: <br> `300`. |
| `colorType`    | String | format of color to be emitted by the component. Defaults to hex: <br> `hex`. |
| `color`    | String | hex code of your color. Defaults to red: <br> `#FF0000`. |

[Back To Top](#user-content-quick-links)


## <a name="outputs">Outputs</a>
`<rcp-radial-color-picker>` component has several outputs, all of which are optional.

| Options       | Type   | Default/Description |
|------------|--------|---------|
| `select` | Function | Callback which is triggered when a color is selected. |
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

## <a name="instance-methods">Instance methods</a>
| Name       | Description |
|------------|-------------|
| `open` | Programatically opens the color picker if it's not already opened. |
| `close` | Programatically closes the color picker if it's not already closed. |


[Back To Top](#user-content-quick-links)


## <a name="questions">First Asked Questions</a>

<details>
    <summary>Color picker uses <code>hex</code>. How can I use other formats like <code>rgb()</code> or hsl?</summary>
    <p>The color picker will recognize the format of the input, but will still work internally with hex value of the provided color. You can change the output format by setting the colorType property to `hex`, `rgb` or `hsl`</p>
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


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
