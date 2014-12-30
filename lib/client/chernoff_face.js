var React = require('react'),
  d3ChernoffChart = require('./d3_chernoff_chart.js');

// Let's define a dumb stateless React component for a Chernoff face, that
// uses this low level d3 stuff.

var ChernoffFace = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    d3ChernoffChart.create(el, {
      width: '200px',
      height: '200px'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    d3ChernoffChart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data
    };
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
    var el = this.getDOMNode();
    d3ChernoffChart.destroy(el);
  },

  render: function() {
    return (<div className="ChernoffFace"></div>);
  }
});

module.exports = ChernoffFace;
