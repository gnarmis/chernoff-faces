var React = require('react'),
  FaceParamsForm = require('./face_params_form.js');


var ChernoffDemo = React.createClass({
  render: function() {
    return (
      <div className="ChernoffDemo">
        <FaceParamsForm />
      </div>
    );
  }
});

// Can't call components directly in React anymore, so let's give App the
// ability to start off everything.
ChernoffDemo.start = function() {
  React.render(function(){return <ChernoffDemo />;}(), document.getElementById('chernoff-demo-base'))
};

module.exports = ChernoffDemo;