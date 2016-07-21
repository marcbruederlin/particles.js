/*!
 * A lightweight and dependency-free javascript plugin
 * for particle backgrounds.
 * 
 * @author Marc Brüderlin <hello@marcbruederlin.com>
 * @version 0.1.0
 * @license MIT
 * @see https://marcbruederlin.github.io/particles.js/
 */
var Particles = (function(window, document) {
  'use strict';

  var Plugin, Particle, canvas, context, config;

  Plugin = function() {
    this.storage = [];

    this.defaults = {
      maxParticles: 100,
      sizeVariations: 3,
      speed: 0.5,
      color: '#ffffff',
      minDistance: 120,
      connectParticles: false
    };

    this.init = function(options) {
      window.addEventListener('resize', this.resize.bind(this), false);

      config = _mergeObjects(this.defaults, options);
      config.color = _hex2rgb(config.color);

      canvas = document.querySelector(config.selector);
      context = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      for(var i = config.maxParticles; i--;) {
        this.storage.push(new Particle());
      }

      this.animate();
    };

    this.animate = function() {
      this.draw();
      window.requestAnimFrame(this.animate.bind(this));
    };

    this.draw = function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      for(var i = this.storage.length; i--;) {
        var particle = this.storage[i];
        particle.draw();
      }
    
      this.update();
    };

    this.update = function() {
      for(var i = this.storage.length; i--;) {
        var particle = this.storage[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if(particle.x + particle.radius > canvas.width) {
          particle.x = particle.radius;
        } else if(particle.x - particle.radius < 0) {
          particle.x = canvas.width - particle.radius;
        }
          
        if(particle.y + particle.radius > canvas.height) {
          particle.y = particle.radius;
        } else if(particle.y - particle.radius < 0) {
          particle.y = canvas.height - particle.radius;
        }
        
        if(config.connectParticles) {
          for(var j = i + 1; j < this.storage.length; j++) {
            var particle2 = this.storage[j];
          
            this.distance(particle, particle2);
          }
        }
      }
    };

    this.distance = function(p1, p2) {
      var n, r = p1.x - p2.x,
          dy = p1.y - p2.y;
          
      n = Math.sqrt(r * r + dy * dy);
      
      if(n <= config.minDistance) {
        context.beginPath();
        context.strokeStyle = 'rgba(' + config.color.r + ', ' + config.color.g + ', ' + config.color.b + ', ' + (1.2 - n / config.minDistance) + ')';
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.stroke();
        context.closePath();
      }
    };

    this.resize = function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      this.draw();
    };
  };

  Particle = function() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = Math.random() * config.speed * 2 - config.speed;
    this.vy = Math.random() * config.speed * 2 - config.speed;
    this.radius = Math.random() * Math.random() * config.sizeVariations;

    this.draw = function() {
      context.fillStyle = 'rgb(' + config.color.r + ', ' + config.color.g  + ', ' + config.color.b + ')';
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fill();
    };

    this.draw();
  };

  /**
   * Merge the keys of two objects and return a comined object.
   *
   * @param {Object} source - object with the default keys
   * @param {Object} obj - object with additional keys who will extend the source
   *
   * @return {Object} combined object
   * 
   * @todo Fix variable names and check if obj is undefined
   */
  function _mergeObjects(source, obj) {
    Object.keys(obj).forEach(function(key) { source[key] = obj[key]; });
    return source;
  }

  /**
   * Converts a hex string to a rgb object.
   *
   * @param {String} hex - hex value who should be converted
   *
   * @return {Object} object with all seperate color channels
   */
  function _hex2rgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  /**
   * Return a new plugin instance.
   * 
   * @return …
   */
  return new Plugin();
})(window, document);