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

// Part 2...

// Hmm, so for a visual representation, I need to first define what facial
// variables I can handle.

// I'll rely on the d3 plugin called chernoff.js to do this. I packaged it up
// myself for Bower. It exposes various facial features and expects values
// within particular ranges, which is how I was imagining it anyway. And it
// uses SVG paths at the bottom, it seems; those looke like they'd take time
// to master, so I'm glad I can skip that work entirely.

// First, a very simple example to get things displaying.
// Mostly lifted from http://bl.ocks.org/larskotthoff/2011590
function displayFace(selector, height, width) {
  // This seems to be defining how to pull attributes from an object that is
  // passed in and then call the functions defined in chernoff.js with those
  // values.
  var c = d3.chernoff()
    .face(function(d) { return d.f; })
    .hair(function(d) { return d.h; })
    .mouth(function(d) { return d.m; })
    .nosew(function(d) { return d.nw; })
    .noseh(function(d) { return d.nh; })
    .eyew(function(d) { return d.ew; })
    .eyeh(function(d) { return d.eh; })
    .brow(function(d) { return d.b; });

  var svg = d3.select(selector).append('svg:svg')
    .attr('height', height).attr('width', width);

  var data = [
    {f: 0, h: -1, m: -1, nw: 0.3, nh: 0.3, ew: 0.3, eh: 0.3, b: -1}
  ];

  svg.selectAll("g.chernoff").data(data).enter()
    .append("svg:g")
    .attr("class", "chernoff")
    .attr("transform", function(d, i) {
      return "scale(1." + i + ")translate(" +
        (i*100) + "," + (i*100) + ")";
    })
    .call(c);
};
