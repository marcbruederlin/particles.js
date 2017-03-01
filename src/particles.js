/*!
 * A lightweight and dependency-free javascript plugin
 * for particle backgrounds.
 * 
 * @author Marc Bruederlin <hello@marcbruederlin.com>
 * @version 2.0.0
 * @license MIT
 * @see https://github.com/marcbruederlin/particles.js
 */

/* exported Particles */
var Particles = (function(window, document) {
  'use strict';
  
  var Plugin, Particle = {};

  /**
   * Description here…
   * 
   * @constructor
   */
  Plugin = (function() {
    function Plugin() {
      var _ = this;

      _.defaults = {
        responsive: null,
        selector: null,
        maxParticles: 100,
        sizeVariations: 3,
        speed: 0.5,
        color: _._hex2rgb('#000000'),
        minDistance: 120,
        connectParticles: false
      };

      _.element = null;
      _.context = null;
      _.activeBreakpoint = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.originalSettings = null;
      _.windowWidth = 0;
      _.storage = [];
    }

    return Plugin;
  }());


  /**
   * Initialize the plugin.
   * 
   * @public
   * @param {Object} settings
   */
  Plugin.prototype.init = function(settings) {
    var _ = this;

    settings.color = _._hex2rgb(settings.color);
    _.options = _._extend(_.defaults, settings);
    _.originalSettings = JSON.parse(JSON.stringify(_.options));

    _._initializeCanvas();
    _._initializeEvents();
    _._initializeStorage();
    _._registerBreakpoints();
    _._checkResponsive(true);

    _._animate();
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._registerBreakpoints = function() {
    var _ = this, breakpoint, currentBreakpoint, l, 
        responsiveSettings = _.options.responsive || null;

    if(typeof responsiveSettings === 'object' && responsiveSettings !== null && responsiveSettings.length) {
      for(breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;
        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

        if(responsiveSettings.hasOwnProperty(breakpoint)) {
          if(responsiveSettings[breakpoint].settings.color) {
            responsiveSettings[breakpoint].settings.color = _._hex2rgb(responsiveSettings[breakpoint].settings.color);
          }

          while(l >= 0) {
            if(_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }

            l--;
          }

          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
        }
      }

      _.breakpoints.sort(function(a, b) {
        return b-a;
      });
    }
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._initializeEvents = function() {
    var _ = this;

    window.addEventListener('resize', _._resize.bind(_), false);
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._initializeCanvas = function() {
    var _ = this;

    if(!_.options.selector) {
      console.warn('particles.js: No selector specified! Check https://github.com/marcbruederlin/particles.js#options');
      return false;
    }

    _.element = document.querySelector(_.options.selector);
    _.context = _.element.getContext('2d');

    _.element.width = window.innerWidth;
    _.element.height = window.innerHeight;
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._initializeStorage = function() {
    var _ = this;

    _.storage = [];

    for (var i = _.options.maxParticles; i--;) {
      _.storage.push(new Particle(_.element, _.context, _.options));
    }
  };


  Plugin.prototype._checkResponsive = function(forceUpdate) {
    var _ = this,
        breakpoint, targetBreakpoint = false,
        windowWidth = window.innerWidth;

    if(_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
      targetBreakpoint = null;

      for(breakpoint in _.breakpoints) {
        if(_.breakpoints.hasOwnProperty(breakpoint)) {
          if(windowWidth <= _.breakpoints[breakpoint]) {
            targetBreakpoint = _.breakpoints[breakpoint];
          }
        }
      }

      if(targetBreakpoint !== null) {
        _.activeBreakpoint = targetBreakpoint;
        _.options = _._extend(_.options, _.breakpointSettings[targetBreakpoint]);
      } else {
        if(_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          targetBreakpoint = null;
          
          _.options = _._extend(_.options, _.originalSettings);
        }
      }
    }
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._refresh = function() {
    var _ = this;

    _._initializeStorage();
    _._update();
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._resize = function() {
    var _ = this;

    _.element.width = window.innerWidth;
    _.element.height = window.innerHeight;

    if(window.innerWidth !== _.windowWidth) {
      clearTimeout(_.windowDelay);

      _.windowDelay = window.setTimeout(function() {
        _.windowWidth = window.innerWidth;
        _._checkResponsive();
        _._refresh();
      }, 50);
    }
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._animate = function() {
    var _ = this;

    _._draw();
    window.requestAnimFrame(_._animate.bind(_));
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._draw = function() {
    var _ = this;

    _.context.clearRect(0, 0, _.element.width, _.element.height);
    
    for (var i = _.storage.length; i--;) {
      var particle = _.storage[i];
      particle._draw();
    }
    
    _._update();
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._update = function() {
    var _ = this;

    for (var i = _.storage.length; i--;) {
      var particle = _.storage[i];
        
      particle.x += particle.vx;
      particle.y += particle.vy;
        
      if (particle.x + particle.radius > _.element.width) {
        particle.x = particle.radius;
      } else if (particle.x - particle.radius < 0) {
        particle.x = _.element.width - particle.radius;
      }
          
      if (particle.y + particle.radius > _.element.height) {
        particle.y = particle.radius;
      } else if (particle.y - particle.radius < 0) {
        particle.y = _.element.height - particle.radius;
      }
        
      if (_.options.connectParticles) {
        for (var j = i + 1; j < _.storage.length; j++) {
          var particle2 = _.storage[j];
        
          _._calculateDistance(particle, particle2);
        }
      }
    }
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._calculateDistance = function(p1, p2) {
    var _ = this;

    var n, r = p1.x - p2.x, dy = p1.y - p2.y;  
        n = Math.sqrt(r * r + dy * dy);
      
      if (n <= _.options.minDistance) {
        _.context.beginPath();
        _.context.strokeStyle = 'rgba(' + _.options.color.r + ', ' + _.options.color.g + ', ' + _.options.color.b + ', ' + (1.2 - n / _.options.minDistance) + ')';
        _.context.moveTo(p1.x, p1.y);
        _.context.lineTo(p2.x, p2.y);
        _.context.stroke();
        _.context.closePath();
      }
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._extend = function(source, obj) {
    Object.keys(obj).forEach(function(key) { source[key] = obj[key]; });
    
    return source;
  };


  /**
   * Description here…
   * 
   * @private
   */
  Plugin.prototype._hex2rgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };


  /**
   * Description here…
   * 
   * @constructor
   */
  Particle = function(element, context, options) {
    var _ = this;
    
    _.element = element;
    _.context = context;
    _.options = options;

    _.x = Math.random() * _.element.width;
    _.y = Math.random() * _.element.height;
    _.vx = Math.random() * _.options.speed * 2 - _.options.speed;
    _.vy = Math.random() * _.options.speed * 2 - _.options.speed;
    _.radius = Math.random() * Math.random() * _.options.sizeVariations;

    _._draw();
  };


  /**
   * Description here…
   * 
   * @private
   */
  Particle.prototype._draw = function() {
    var _ = this;

    _.context.fillStyle = 'rgb(' + _.options.color.r + ', ' + _.options.color.g  + ', ' + _.options.color.b + ')';
    _.context.beginPath();
    _.context.arc(_.x, this.y, _.radius, 0, Math.PI * 2, false);
    _.context.fill();
  };

  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  return new Plugin();
})(window, document);

(function() {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define('Particles', function () { return Particles; });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Particles;
  } else {
    window.Particles = Particles;
  }
})();
