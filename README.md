# particles.js

[![Github file size](https://img.shields.io/github/size/marcbruederlin/particles.js/dist/particles.min.js.svg)](https://github.com/marcbruederlin/particles.js/blob/master/dist/particles.min.js)
[![Travis](https://img.shields.io/travis/marcbruederlin/particles.js.svg)](https://travis-ci.org/marcbruederlin/particles.js)
[![David](https://img.shields.io/david/marcbruederlin/particles.js.svg)](https://david-dm.org/marcbruederlin/particles.js)
[![David](https://img.shields.io/david/dev/marcbruederlin/particles.js.svg)](https://david-dm.org/marcbruederlin/particles.js?type=dev)
[![npm](https://img.shields.io/npm/v/particlesjs.svg)](https://www.npmjs.com/package/particlesjs)
[![CDNJS](https://img.shields.io/cdnjs/v/particlesjs.svg)](https://cdnjs.com/libraries/particlesjs)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/marcbruederlin/particles.js/master/LICENSE)

particles.js is a lightweight, dependency-free and responsive javascript plugin for particle backgrounds.

[<img src="http://i.giphy.com/CPEar2kArhFny.gif"/>](https://marcbruederlin.github.io/particles.js/)

## Installation
There are several ways to install particles.js:
- [Download the latest version](https://github.com/marcbruederlin/particles.js/archive/master.zip)
- Install with npm: `npm install particlesjs --save`
- Use the CDN: `https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js`

## Usage
Include the minified JS in your HTML (right before the closing body tag).
```html
<body>
  …
  <script src="path/to/particles.min.js"></script>
</body>
```

Add a canvas element to your markup (it should be the last element)
```html
<body>
  …
  <canvas class="background"></canvas>
  <script src="path/to/particles.min.js"></script>
</body>
```

Add a few styles to your css.
```css
html,
body {
  margin: 0;
  padding: 0;
}

.background {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: 0;
}
```

Initialize the plugin on the `window.onload` event.
```js
window.onload = function() {
  Particles.init({
    selector: '.background'
  });
};
```

## Options
Option | Type | Default | Description
------ | ------------- | ------------- | -----------
`selector` | string | - | *Required:* The CSS selector of your canvas element
`maxParticles` | integer | `100` | *Optional:* Maximum amount of particles
`sizeVariations` | integer | `3` | *Optional:* Amount of size variations
`speed` | integer | `0.5` | *Optional:* Movement speed of the particles
`color` | string or string[] | `#000000` | *Optional:* Color(s) of the particles and connecting lines
`minDistance` | integer | `120` | *Optional:* Distance in `px` for connecting lines
`connectParticles` | boolean | `false` | *Optional:* `true`/`false` if connecting lines should be drawn or not
`responsive` | array | `null` | *Optional:* Array of objects containing breakpoints and options

Example how to use the [responsive option](https://marcbruederlin.github.io/particles.js/#responsive-option).

## Methods
Method | Description
------ | -----------
`pauseAnimation` | Pauses/stops the particle animation
`resumeAnimation` | Continues the particle animation
`destroy` | Destroys the plugin

Example how to use the [public methods](https://marcbruederlin.github.io/particles.js/#use-methods).

## Browser Support
IE9+ and all modern browsers.

## Examples
See [various examples](https://marcbruederlin.github.io/particles.js/#examples) how you can use particles.js.

## Build
To compile the distribution files by yourself, make sure that you have node.js and gulp installed, then:
- Clone the repository: `https://github.com/marcbruederlin/particles.js.git`
- Change in the project directory: `cd particles.js`
- Install the dependencies: `npm install`
- Run the gulp build task `gulp build` to regenerate the `dist` folder. <br/> You can also run `gulp build --watch` to watch for file changes and automatically rebuild the files.

## Using particles.js?
If you’re using particles.js in some interesting way or on a cool site, I’d be very grateful if you <a href="mailto:hello@marcbruederlin.com?subject=Hey, I'm using particles.js">shoot me</a> a link to it.<br />
For any problems or questions don't hesitate to open an issue.<br />

## License
particles.js is created by [Marc Brüderlin](https://marcbruederlin.com) and released
under the [MIT license](https://github.com/marcbruederlin/particles.js/blob/master/LICENSE).

## Version 1.x
The source code for particles.js 1.x has been moved to the [v1 branch](https://github.com/marcbruederlin/particles.js/tree/v1).
