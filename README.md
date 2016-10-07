# particles.js

[![Build Status](https://travis-ci.org/marcbruederlin/particles.js.svg?branch=master)](https://travis-ci.org/marcbruederlin/particles.js) [![dependencies Status](https://david-dm.org/marcbruederlin/particles.js/status.svg)](https://david-dm.org/marcbruederlin/particles.js) [![devDependencies Status](https://david-dm.org/marcbruederlin/particles.js/dev-status.svg)](https://david-dm.org/marcbruederlin/particles.js?type=dev) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)   

particles.js is a lightweight (~2kb) and dependency-free javascript plugin for particle backgrounds.

[Demo](https://marcbruederlin.github.io/particles.js/)

## Installation
There are several ways to install particles.js:
- [Download the latest version](https://github.com/marcbruederlin/particles.js/archive/master.zip)
- Install with npm: `npm install particlesjs --save`
- Use the CDN: `https://npmcdn.com/particlesjs@1.0.2/dist/particles.min.js`

## Usage
Include the minified JS in your HTML file.
```html
<script src="path/to/particles.min.js"></script>
```

Create a canvas element in your body tag.
```html
<canvas id="myCanvas"></canvas>
```

Add a few styles to your css.
```css
html,
body {
  margin: 0;
}

#myCanvas {
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
  Particles.init({ options });
};

// e.g.
window.onload = function() {
  Particles.init({
    selector: '#myCanvas',
    color: '#0f9976'
  });
};
```

## Options
Option | Default | Description
------ | ------------- | -----------
`selector` | - | *Required:* The CSS selector of your canvas element
`maxParticles` | `100` | *Optional:* Maximum amount of particles
`sizeVariations` | `3` | *Optional:* Amount of size variations
`speed` | `0.5` | *Optional:* Movement speed of the particles
`color` | `#000000` | *Optional:* Color of particles and connecting lines
`minDistance` | `120` | *Optional:* Distance in `px` for conntecting lines
`connectParticles` | `false` | *Optional:* `true`/`false` if connecting lines should be drawn


## Browser Support
IE9+ and all modern browsers.

## Build
To compile the distribution files by yourself, make sure that you have node.js and gulp installed, then:
- Clone the repository: `https://github.com/marcbruederlin/particles.js.git`
- Change in the project directory: `cd particles.js`
- Install the dependencies: `npm install`
- Run the gulp build task `gulp build` to regenerate the `dist` folder. <br/> You can also run `gulp build --watch` to watch for file changes and automatically rebuild the files.

## Using particles.js?
If you’re using particles.js in some interesting way or on a cool site, I’d be very grateful if you <a href="mailto:hello@marcbruederlin.com?subject=Hey, I'm using particles.js">shoot me</a> a link to it.<br />
For any problems or questions don't hesitate to open an issue.<br />
Do you like particles.js? If you want, you can [buy me a coffee](https://www.paypal.me/marcbruederlin).

## License
particles.js is created by [Marc Brüderlin](https://marcbruederlin.com) and released 
under the [MIT license](https://github.com/marcbruederlin/particles.js/blob/master/LICENSE).