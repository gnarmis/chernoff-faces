var d3 = require('d3');

// this is a Bower component; we use debowerify and browserify together
require('chernoff-d3');


// Ok, how about a stateless way to render a face? It'll be nice... it would
// make composition easier later.

// This is the plugin's renderer. Chernoff.js defines various ways of weaving
// in values; I just pulled this from the simple example, it seems to work.
var chernoffRenderer = d3.chernoff()
    .face(function(d) { return Number(d.face); })
    .hair(function(d) { return Number(d.hair); })
    .mouth(function(d) { return Number(d.mouth); })
    .nosew(function(d) { return Number(d.nosew); })
    .noseh(function(d) { return Number(d.noseh); })
    .eyew(function(d) { return Number(d.eyew); })
    .eyeh(function(d) { return Number(d.eyeh); })
    .brow(function(d) { return Number(d.brow); });


// Let's define a stateless wrapper around this plugin now....

var d3ChernoffChart = {};

d3ChernoffChart.create = function(el, props, state) {
  // console.log('d3ChernoffChart.create() called');
  var svg = d3.select(el)
    // make sure an svg tag from the svg namespace exists
    // (https://github.com/mbostock/d3/wiki/Selections#append)
    .append('svg:svg')
    // set viewport size
    .attr('width', props.width).attr('height', props.height);

  this.update(el, state);
};

d3ChernoffChart.update = function(el, state) {
  // console.log('d3ChernoffChart.update() called')
  this._clearFace();
  this._drawFace(el, state.data);
};

d3ChernoffChart.destroy = function(el, props, state) {
  // console.log('d3ChernoffChart.destroy() called');
  this._clearFace();
};

d3ChernoffChart._drawFace = function(el, data) {
  var face = d3.select('svg')
    // I expect a 'g' tag with class 'chernoff'
    .selectAll('g.chernoff')

  face.data(data)
    .enter()
    .append('svg:g')
    .attr('class', 'chernoff')
    .call(chernoffRenderer);
};

d3ChernoffChart._clearFace = function() {
  d3.select('svg').selectAll('g.chernoff').remove();
};

// So, with `d3ChernoffChart`, you're able to weave in state at any point; no
// worrying about implicit state in some weird corner of d3.

module.exports = d3ChernoffChart;
