var React = require('react');
var Picker = require('../picker/picker.jsx');

var Source = React.createClass({
  propTypes: {
    source: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      display: 'none',
      displayX: 0,
      displayY: 0
    };
  },
  handlePicker: function(ev) {
    if (ev.target.classList.contains('active')) {
      this.setState({
        display: 'none'
      });
      ev.target.classList.remove('active');
    } else {
      this.setState({
        display: 'block',
        displayX: ev.target.offsetLeft + ev.target.offsetWidth*(3/2),
        displayY: ev.target.offsetTop + ev.target.offsetHeight
      });
      ev.target.classList.add('active');
    }
  },
  render: function() {
    return (
      <span className="source-wrapper">
        <span className="source-statebox widgetLeft">
          <input type="checkbox" defaultChecked="checked" />
        </span>
        <span className="source-namebox widgetLeft">{this.props.source.name}</span>
        <span className="source-destroybox widgetRight">
          <img src="dest/img/destroy-icon.png" />
        </span>
        <span className="source-colorbox widgetRight">
          <span className="picker-toggle" onClick={this.handlePicker}></span>
          <Picker display={this.state.display} displayX={this.state.displayX} displayY={this.state.displayY} />
        </span>
        <span className="source-staplebox widgetRight">
          <select>
            <option value="none">none</option>
          </select>
        </span>
      </span>
    );
  }
});

module.exports = Source;
