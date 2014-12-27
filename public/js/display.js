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

var faceCreator = function() {
  return {
    head: {id: 0},
    hair: {id: 0},
    eyebrows: [
      {id: 0, lr: "l", cx: 135, cy: 250},
      {id: 0, lr: "r", cx: 265, cy: 250}
    ],
    eyes: [
      {id: 1, lr: "l", cx: 135, cy: 280, angle: 10.553},
      {id: 1, lr: "r", cx: 265, cy: 280, angle: 10.553}
    ],
    nose: {id: 1, lr: "l", cx: 200, cy: "330", size: 0.624, flip: true},
    mouth: {id: 1, cx: 200, cy: 400},
    fatness: 0.813,
    color:"#f2d6cb"
  };
};

// Example display of a face: faces.display('face1', faceCreator())

// Now, we also depend on the bower component 'facesjs-bower'

