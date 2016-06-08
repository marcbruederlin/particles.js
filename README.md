# jQuery Particles

A lightweight and easy-to-use jQuery plugin for particle backgrounds.

## Installation
Download the [latest](https://github.com/maaarc/particles/blob/master/dist/jquery.particles.min.js) version.

## Usage
Include jQuery and jQuery Particles in your html file
```html
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.particles.min.js"></script>
```

Create a canvas element
```html
<canvas id="myCanvas"></canvas>
```

Initialize jQuery Particles
```javascript
$('#myCanvas').particles({ options });
```

## Options
```javascript
$('#myCanvas').particles({
  maxParticles: 100, // Max amount of particles
  size: 3, // Amount of size variations
  speed: 0.5, // Movement speed
  color: '#000000', // Particle color
  connectParticles: true, // Connect nearby particles with lines
  minDist: 140 // Distance for nearby particles
});
```

## License
The MIT License (MIT)

Copyright (c) 2016 Marc Brüderlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.