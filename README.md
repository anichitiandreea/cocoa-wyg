# cocoa-wyg

[![NPM Version](https://img.shields.io/badge/npm%20package-1.2.0-important)](https://www.npmjs.com/package/cocoa-wyg)
[![Build Status](https://img.shields.io/badge/build-passing-success)](https://github.com/anichitiandreea/cocoa-wyg/deployments/activity_log?environment=Production)
[![License](https://img.shields.io/badge/license-MIT-blueviolet)](https://github.com/anichitiandreea/cocoa-wyg/blob/master/LICENSE)

A lightweight WYSIWYG editor written in javascript.

## Installation

Install via npm:

```
npm install cocoa-wyg
```
## Usage

You can see an usage example in **examples** folder.

Firstly, you need to include the bundled file

```javascript
<script src="node_modules/cocoa-wyg/dist/bundle.min.js"></script>
```
And some <textarea> element

```html
<textarea id="textarea-real"></textarea>
```

Then, create a new instance of editor

```javascript
var editor = new Editor("textarea-real");
```
## Live demo :eyes:

A live demo can be seen [here](https://cocoa-wyg.vercel.app/).

## License

cocoa-wyg may be freely distributed under the MIT license.

