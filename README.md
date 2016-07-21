# particles.js

A lightweight (~2kb) and easy-to-use jQuery plugin for particle backgrounds.

[Demo](https://www.marcbruederlin.com/particles)

## Installation
Download the [latest](https://github.com/maaarc/particles/archive/master.zip) version.

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

## Browser Support
Soon…

## License
particles.js is created by [Marc Brüderlin](https://marcbruederlin.com) and released 
under the [MIT licence](https://github.com/marcbruederlin/particles.js/blob/master/LICENSE).
For any problem or question do not hesitate to open an issue.