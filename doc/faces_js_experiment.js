// This exploration with faces.js didn't pan out, but I'll leave it here.

// Part 2...

// Hmm, so for a visual representation, I need to first define what facial
// variables I can handle.

// Face generation library: http://dumbmatter.com/facesjs/.

// This library will force me to define some way to relate numbers in a
// particular range to visual differences in each facial feature. One
// simplification: force a smaller range. Or perhaps even separate ranges per
// feature?



/*
* Some Basic Objects
* These help us delve into the data that powers faces.js
*/


// A basic function object that represents a generic facial feature
function FacialFeature(options) {
  if (options==undefined) {options = {}};
  if (options.id==undefined) {options.id=0;}

  this.id = options.id;
  this.lr = options.lr;
  this.cx = options.cx;
  this.cy = options.cy;
  this.size = options.size;
  this.angle = options.angle;
  this.flip = options.flip;
};
FacialFeature.prototype = {};

// Eyebrows as their own FacialFeature. They have a default :cy property
// because we're treating it as a fixed value.
function Eyebrow(options) {
  if (options==undefined) {options={}};
  if (options.cy==undefined) {options.cy=250;}

  FacialFeature.call(this, options);
};
Eyebrow.prototype = Object.create(FacialFeature.prototype);

// Eyes as their own FacialFeature. They have a default :cy property because
// we're treating it as a fixed value.
function Eye(options) {
  if (options==undefined) {options={}};
  if (options.cy==undefined) {options.cy=280;}

  FacialFeature.call(this, options);
};
Eye.prototype = Object.create(FacialFeature.prototype);

// Noses as their own FacialFeature. They have a default :cy property because
// we're treating it as a fixed value.
function Nose(options) {
  if (options==undefined) {options={}};
  if (options.cy==undefined) {options.cy=330;}

  FacialFeature.call(this, options);
};
Nose.prototype = Object.create(FacialFeature.prototype);

// Mouths as their own FacialFeature. They have a default :cy property because
// we're treating it as a fixed value.
function Mouth(options) {
  if (options==undefined) {options={}};
  if (options.cy==undefined) {options.cy=400;}

  FacialFeature.call(this, options);
};
Mouth.prototype = Object.create(FacialFeature.prototype);

// Create an object which facejs can display
function Face() {
  this.head = new FacialFeature();
  this.hair = new FacialFeature();
  this.eyebrows = map(
    'opts -> new Eyebrow(opts)'.lambda(),
    [{lr: 'l', cx: 135}, {lr: 'r', cx: '265'}]
  );
  this.eyes = map(
    'opts -> new Eye(opts)',
    [{lr: 'l', cx: 135, angle: 5}, {lr: 'r', cx: 265, angle: 5}]
  );
  this.nose = new Nose({lr: "l", cx: 200, size: 0.624, flip: true});
  this.mouth = new Mouth({cx: 200});
  this.fatness = 0.8;
  this.color = "#f2d6cb";
};

// Example display of a face: faces.display('face1', new Face())

// Now, we also depend on the bower component 'facesjs-bower'

// Let's put a smile on that face!

// I found a good exploration of SVG paths here: https://www.dashingd3js.com/svg-paths-and-d3js.

// This is actually decent enough an explanation that it's more valuable for
// me to switch to using D3 with this plugin for Chernoff faces someone
// already made. I can understand this better now. I'll remove this iteration
// entirely.

// There's github.com/d3/d3-plugins but I want chernoff.js by itself and I
// want it packaged up in Bower, so I'll do that, and then start the
// visualization effort over again.
