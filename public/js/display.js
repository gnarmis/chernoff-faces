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

// Apparently Array.sort() is super dumb, so I provide a sorting function for numbers that works as advertised.
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
