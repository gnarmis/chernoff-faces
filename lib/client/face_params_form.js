var React = require('react/addons'),
  ChernoffFace = require('./chernoff_face.js');

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
      <label>face</label>
      <input name="face" type="number" valueLink={this.linkState('face')} />
      <br />
      <label>hair</label>
      <input name="hair" type="number" valueLink={this.linkState('hair')} />
      <br />
      <label>mouth</label>
      <input name="mouth" type="number" valueLink={this.linkState('mouth')} />
      <br />
      <label>nosew</label>
      <input name="nosew" type="number" valueLink={this.linkState('nosew')} />
      <br />
      <label>noseh</label>
      <input name="noseh" type="number" valueLink={this.linkState('noseh')} />
      <br />
      <label>eyew</label>
      <input name="eyew" type="number" valueLink={this.linkState('eyew')} />
      <br />
      <label>eyeh</label>
      <input name="eyeh" type="number" valueLink={this.linkState('eyeh')} />
      <br />
      <label>brow</label>
      <input name="brow" type="number" valueLink={this.linkState('brow')} />
      <br />
    </form>
    <br />
    <ChernoffFace data={this.composeData()} />
    </div>
    );
  }
});

module.exports = FaceParamsForm;