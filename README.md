# HTML-elements-with-Web-Components
Some HTML input elements appear differently across browsers. The elements defined in this repo ensure your design remains consistent across all of them. These elements are made with Web Components. 

## !!!IMPORTANT!!!
These elements are not an equivalent of existing input elements. You can't add a label to them, when submitting a form their value will not be sent, etc. These features will be added later on, but for now, if you want to use these elements and replicate the behaviour of the input elements you need to write some extra JS.

## Table of Contents
- [`<custom-checkbox>`](#custom-checkbox)
- [`<custom-radio-button>`](#custom-radio-button)
- [`<custom-input>`](#custom-input)

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
Attributes: `checked`, `disabled`, `name`, `value`, `tabindex`.

States: `checked`, `disabled`, `focused`, `active`. In order to style the checkboxes depending on the state use the `:state()` pseudo-class.

### NOTES!
- the checkbox is 30x30 px by default;
- to change the size of the checkbox you need to set the `width` property;
- the checkbox is an `inline-grid` element.

Examples:
```html
	<custom-checkbox></custom-checkbox>
	<custom-checkbox checked disabled></custom-checkbox>
	<custom-checkbox style="width: 50px;"></custom-checkbox>
```

```html
	<style>
		custom-checkbox:state(checked){
            background-color: green;
        }
	</style>
	<custom-checkbox style="width: 50px;"></custom-checkbox>
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
Attributes: `checked`, `disabled`, `name`, `value`, `tabindex`.

States: `checked`, `disabled`, `focused`, `active`. In order to style the checkboxes depending on the state use the `:state()` pseudo-class.

### EVENTS

#### custom-change
- triggered when the radio button is checked;
- it `bubbles`;
- the `detail` property is an object with the following properties: `checked`, `name`, `value`.


### NOTES!
- the radio button is 30x30 px by default;
- to change the size of the radio button you need to set the `width` property;
- the radio button is an `inline-grid` element;
- if the radio group doesn't have a `custom-form` ancestor, then you can check multiple radio buttons with the same name, if they have different parents.

Examples:
```html
	<custom-radio-button></custom-radio-button>
	<custom-radio-button checked disabled></custom-radio-button>
	<custom-radio-button style="width: 50px;"></custom-radio-button>
```

```html
	<style>
		custom-radio-button:state(checked){
            background-color: green;
        }
	</style>
	<custom-radio-button style="width: 50px;"></custom-radio-button>
```


## `<custom-input>`
[DEMO](https://taurbalaur.github.io/HTML-elements-with-Web-Components/#ci)

### How to use
Include this in the `<head>` section of your HTML file:
```html
	<script defer src="https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-input/custom-input.min.js"></script>
```
or in your JS file:
```js
	import 'https://taurbalaur.github.io/HTML-elements-with-Web-Components/custom-input/custom-input.min.js';
```
Attributes: `type`, `value`, `placeholder`, `spellcheck`, `disabled`

### NOTES!
- default type: `text`;
- supported types: `text`;
- properties: `type`, `value`, `defaultValue`, `placeholder`, `spellcheck`, `disabled`;
- setting the `value` attribute changes the `defaultValue` property and vice versa. If the user hasn't changed the `value` property by interacting with the element or setting it with JS, changing `defaultValue` also changes `value` property;
- to change the aspect when focused, use the `:focus-within` pseudo-class.

Examples:
```html
	<custom-input></custom-input>
	<custom-input type="text" value="initial" disabled></custom-input>
	<custom-input type="text" placeholder="Type..." spellcheck style="background-color:orangered;"></custom-input>
```
