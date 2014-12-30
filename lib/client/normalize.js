require('../../config/boot.js');

var norm = {};

// It's dumb that I have to do this myself...
norm.min = 'xs -> this.numericSort(xs)[0]'.lambda();
norm.max = 'xs -> this.numericSort(xs)[this.count(xs)-1]'.lambda();
norm.count = 'xs.length'.lambda();
norm.numericCompare = 'a, b -> a <= b ? (a < b ? -1 : 0) : 1'.lambda();

// Apparently Array.sort() is super dumb, so I provide a sorting function for
// numbers that works as advertised.
norm.numericSort = function(array) {
  var numericArray = map('Number(x)', array);
  return numericArray.sort(this.numericCompare);
};

// Scale any numeric range so that it's between 1 and 100, inclusive.
norm.normalizeRange = function(numericValues) {
  var minValue = this.min(numericValues);
  var maxValue = this.max(numericValues);

  return map(
    function(value) { return ((value - minValue)/(maxValue - minValue))*(100-1) + 1; },
    numericValues
  );
};

module.exports = norm;
