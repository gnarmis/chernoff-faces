var React = require('react/addons'),
  ChernoffFace = require('./chernoff_face.js');



var Grid = require('react-bootstrap/grid');
var Row = require('react-bootstrap/row');
var Col = require('react-bootstrap/col');
var Input = require('react-bootstrap/input');

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
    return (<Grid>
      <Row>
        <Col xs={8} md={6} mdOffset={6} xsOffset={4}>
          <ChernoffFace data={this.composeData()} />
        </Col>
      </Row>
      <form id="faceParams" name="faceParams" className="form-horizontal">
      <Row>
        <Col md={2} xs={6}>
          <Input name="face" label="face" type="number" step="0.1" valueLink={this.linkState('face')} className="form-control" />
        </Col>
        <Col md={2} xs={6}>
          <Input name="hair" label="hair" type="number" steo="0.1" valueLink={this.linkState('hair')} className="form-control" />
        </Col>
        <Col md={2} xs={6}>
          <Input name="mouth" label="mouth" type="number" step="0.1" valueLink={this.linkState('mouth')} className="form-control" />
        </Col>
        <Col md={2} xs={6}>
          <Input name="brow" label="brow" type="number" step="0.1" valueLink={this.linkState('brow')} className="form-control" />
        </Col>
      </Row>
      <Row>
        <Col md={2} xs={6}>
          <Input name="nosew" label="nose w" type="number" step="0.1" valueLink={this.linkState('nosew')} className="form-control" />
        </Col>
        <Col md={2} xs={6}>
          <Input name="noseh" label="nose h" type="number" step="0.1" valueLink={this.linkState('noseh')} className="form-control" />
        </Col>
        <Col md={2} xs={6}>
          <Input name="eyew" label="eye w" type="number" step="0.1" valueLink={this.linkState('eyew')} className="form-control" />
        </Col>
        <Col md={2} xs={6}>
          <Input name="eyeh" label="eye h" type="number" step="0.1" valueLink={this.linkState('eyeh')} className="form-control" />
        </Col>
      </Row>
      <br />
      </form>
    </Grid>
    );
  }
});

module.exports = FaceParamsForm;