# HTML-elements-with-Web-Components
Some HTML input elements appear differently across browsers. The elements defined in this repo ensure your design remains consistent across all of them. These elements are made with Web Components. 

## !!!IMPORTANT!!!
These elements are not an equivalent of existing input elements. You can't add a label to them, when submitting a form their value will not be sent, etc. These features will be added later on, but for now, if you want to use these elements and replicate the behaviour of the input elements you need to write some extra JS.

## Table of Contents
- [`<custom-checkbox>`](#custom-checkbox)
- [`<custom-radio-button>`](#custom-radio-button)

## `<custom-checkbox>`
[DEMO](https://taurbalaur.github.io/HTML-elements-with-Web-Components/#cc)

### How to use
Include this in the `<head>` section of your HTML file:
```html
	<script defer src="https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-checkbox/custom-checkbox-script.min.js"></script>
```
or in your JS file:
```js
	import 'https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-checkbox/custom-checkbox-script.min.js';
```
Attributes: `checked`, `disabled`

### NOTES!
- the checkbox is 30x30 px by default;
- to change the size of the checkbox you need to set the `width` property;
- the checkbox is an `inline-grid` element;
- to change the border color of the checkbox when unchecked you need to set the `--cc-b` variable/custom property;
- to change the border color of the checkbox when unchecked and hovered you need to set the `--cc-b-h` variable/custom property.
- to change the color of the checkbox when checked you need to set the `--cc-c` variable/custom property;
- to change the color of the checkbox when checked and hovered you need to set the `--cc-c-h` variable/custom property.

Examples:
```html
	<custom-checkbox></custom-checkbox>
	<custom-checkbox checked disabled></custom-checkbox>
	<custom-checkbox style="width: 50px;--cc-c:red;--cc-c-h:orangered;"></custom-checkbox>
```

## `<custom-radio-button>`
[DEMO](https://taurbalaur.github.io/HTML-elements-with-Web-Components/#crb)

### How to use
Include this in the `<head>` section of your HTML file:
```html
	<script defer src="https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-radio-button/custom-radio-button-script.min.js"></script>
```
or in your JS file:
```js
	import 'https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-radio-button/custom-radio-button-script.min.js';
```
Attributes: `checked`, `disabled`

### NOTES!
- the radio button is 30x30 px by default;
- to change the size of the radio button you need to set the `width` property;
- the radio button is an `inline-grid` element;
- to change the border color of the radio button when unchecked you need to set the `--crb-b` variable/custom property;
- to change the border color of the radio button when unchecked and hovered you need to set the `--crb-b-h` variable/custom property.
- to change the color of the radio button when checked you need to set the `--crb-c` variable/custom property;
- to change the color of the radio button when checked and hovered you need to set the `--crb-c-h` variable/custom property.

Examples:
```html
	<custom-radio-button></custom-radio-button>
	<custom-radio-button checked disabled></custom-radio-button>
	<custom-radio-button style="width: 50px;--crb-c:red;--crb-c-h:orangered;"></custom-radio-button>
```
