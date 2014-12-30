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

// Let's focus on a single container and then displaying a face in that single
// container. Hmm, how about a simple object to represent a face? A function
// to create such an object.

function Face(element, properties, state) {
  // default values for arguments...
  if (state==undefined) {state = [{
    face: 0, hair: -1,
    mouth: -1, brow: 0,
    nosew: -1, noseh: 0.3,
    eyew: 0.3, eyeh: 0.3
  }]};
  if (properties==undefined) {properties={}};
  if (properties.height==undefined) {properties.height=500};
  if (properties.width==undefined) {properties.width=500};

  // set initial state and properties
  this.state = state;
  this.properties = properties;

  this.svg = function() {
    return d3.select(element)
      // https://github.com/mbostock/d3/wiki/Selections#append
      .append('svg:svg')
      .attr('height', this.properties.height)
      .attr('width', this.properties.width);
  }

  this.chernoffRenderer = d3.chernoff()
    .face(function(d) { return d.face; })
    .hair(function(d) { return d.hair; })
    .mouth(function(d) { return d.mouth; })
    .nosew(function(d) { return d.nosew; })
    .noseh(function(d) { return d.noseh; })
    .eyew(function(d) { return d.eyew; })
    .eyeh(function(d) { return d.eyeh; })
    .brow(function(d) { return d.brow; });

  this.update = function(state) {
    if (state==undefined) {
      // skip
    } else {
      this.state = state;
      this.remove();
      this.clearHtml();
      this.draw();
    }
  };

  this.draw = function() {
    this.svg().selectAll("g.chernoff")
      .data(this.state)
      .enter()
      .append("svg:g")
      .attr("class", "chernoff")
      .call(this.chernoffRenderer);
  };

  this.remove = function() {
    this.svg().selectAll("g.chernoff").remove();
  };

  this.clearHtml = function() {
    d3.select(element).html("")
  };

  // clear all internal HTML to ensure d3 creates a new face everytime a new
  // Face object is created for the given element
  this.clearHtml();
};

var face1 = [{face: 0, hair: -1, mouth: -1, nosew: 0.3, noseh: 0.3, eyew: 0.3, eyeh: 0.3, brow: -1}];
var face2 = [{face: 0, hair: 1, mouth: 1, nosew: 0.3, noseh: 0.3, eyew: 0.3, eyeh: 0.3, brow: -1}];

// Example:
// > var f = new Face();
// > f.draw();        // face gets drawn!
// > f.update();      // nothing happens, since there's no arguments
// > f.update(face2); // existing face replaed with new face
// > f.state;         // inspect current state


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

var chernoffFace = {};

chernoffFace.create = function(el, props, state) {
  console.log('chernoffFace.create() called');
  var svg = d3.select(el)
    // make sure an svg tag from the svg namespace exists
    // (https://github.com/mbostock/d3/wiki/Selections#append)
    .append('svg:svg')
    // set viewport size
    .attr('width', props.width).attr('height', props.height);

  this.update(el, state);
};

chernoffFace.update = function(el, state) {
  console.log('chernoffFace.update() called')
  this._clearFace();
  this._drawFace(el, state.data);
};

chernoffFace.destroy = function(el, props, state) {
  console.log('chernoffFace.destroy() called');
  this._clearFace();
};

chernoffFace._drawFace = function(el, data) {
  var face = d3.select('svg')
    // I expect a 'g' tag with class 'chernoff'
    .selectAll('g.chernoff')

  face.data(data)
    .enter()
    .append('svg:g')
    .attr('class', 'chernoff')
    .call(chernoffRenderer);
};

chernoffFace._clearFace = function() {
  d3.select('svg').selectAll('g.chernoff').remove();
};


// So, with `chernoffFace`, you're able to weave in state at any point; no
// worrying about implicit state in some weird corner of d3.

// Let's get React in this party too, and define a dumb stateless component
// for a Chernoff face, that uses this low level d3 stuff.

var ChernoffFace = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    chernoffFace.create(el, {
      width: '500px',
      height: '500px'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    chernoffFace.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data
    };
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
    var el = this.getDOMNode();
    chernoffFace.destroy(el);
  },

  render: function() {
    return (<div className="ChernoffFace"></div>);
  }
});

// Now, it'd be nice to twiddle these parameters and have them immediately
// update a Chernoff face. Let's do this with a component that wraps a
// Chernoff face and handles user interaction and also has state.

var FaceParamsForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  composeData: function() {
    return [{
      face: this.state.face,
      hair: this.state.hair,
      mouth: this.state.mouth,
      nosew: this.state.nosew,
      noseh: this.state.noseh,
      eyew: this.state.eyew,
      eyeh: this.state.eyeh,
      brow: this.state.brow
    }];
  },

  getInitialState: function() {
    return {
      face: '0',
      hair: '1',
      mouth: '-1',
      nosew: '0.3',
      noseh: '0.3',
      eyew: '0.3',
      eyeh: '0.3',
      brow: '-1'
    };
  },

  render: function(){
    return (<div><form id="faceParams" name="faceParams">
      <label for="face">face</label>
      <input name="face" type="number" valueLink={this.linkState('face')} />
      <br />
      <label for="hair">hair</label>
      <input name="hair" type="number" valueLink={this.linkState('hair')} />
      <br />
      <label for="mouth">mouth</label>
      <input name="mouth" type="number" valueLink={this.linkState('mouth')} />
      <br />
      <label for="nosew">nosew</label>
      <input name="nosew" type="number" valueLink={this.linkState('nosew')} />
      <br />
      <label for="noseh">noseh</label>
      <input name="noseh" type="number" valueLink={this.linkState('noseh')} />
      <br />
      <label for="eyew">eyew</label>
      <input name="eyew" type="number" valueLink={this.linkState('eyew')} />
      <br />
      <label for="eyeh">eyeh</label>
      <input name="eyeh" type="number" valueLink={this.linkState('eyeh')} />
      <br />
      <label for="brow">brow</label>
      <input name="brow" type="number" valueLink={this.linkState('brow')} />
      <br />
    </form>
    <br />
    <ChernoffFace data={this.composeData()} />
    </div>
    );
  }
});

// An overall app wrapper is also nice to have...

var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <FaceParamsForm />
      </div>
    );
  }
});

// Can't call components directly in React anymore, so let's give App the
// ability to start off everything.
App.start = function() {
  React.render(function(){return <App />;}(), document.getElementById('app'))
};
