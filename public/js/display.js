// We want a way to translate ranges of numeric values into a standard range
// of values. Perhaps just normalization to 1..100?

// What variables can we twiddle? Things like smile shape, nose height,
// eyebrow angle, etc.

// Hmm, actually, let's divide the problem into 2 problems:
// 1. What is the normalized range of numeric values for a given range of
// numeric values?
// 2. What is the visual representation of the given range of normalized
// numeric values using some facial variable?


// Let's address Part 1 by creating a function to normalize values.

// Note: We depend on the bower component 'functional-bower'

// It's dumb that I have to do this myself...
var min = 'xs -> numericSort(xs)[0]'.lambda();
var max = 'xs -> numericSort(xs)[count(xs)-1]'.lambda();
var count = 'xs.length'.lambda();
var numericCompare = 'a, b -> a <= b ? (a < b ? -1 : 0) : 1'.lambda();

// Apparently Array.sort() is super dumb, so I provide a sorting function for
// numbers that works as advertised.
var numericSort = function(array) {
  var numericArray = map('Number(x)', array);
  return numericArray.sort(numericCompare);
};

// Scale any numeric range so that it's between 1 and 100, inclusive.
var normalizeRange = function(numericValues) {
  var minValue = min(numericValues);
  var maxValue = max(numericValues);

  return map(
    function(value) { return ((value - minValue)/(maxValue - minValue))*(100-1) + 1; },
    numericValues
  );
};

// Done with Part 1.

// Hmm, so for a visual representation, I need to first define what facial
// variables I can handle. This will be affected by my approach to

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

