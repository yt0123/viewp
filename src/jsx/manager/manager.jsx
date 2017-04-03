var React = require('react');
var Body = require('./body.jsx');

var Manager = React.createClass({
  propTypes: {
    triggerManager: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      position: -8
    };
  },
  handlePicker: function(ev) {
    var rect = ev.target.getBoundingClientRect();
    var displayX = rect.left + ev.target.offsetWidth;
    var displayY = rect.top + ev.target.offsetHeight;
    console.log(displayX, displayY);
  },
  resolveSetTimeout: function() {
    if (this.refs.view.classList.contains('active')) {
      var currentPixel = Number(this.refs.view.style.top.slice(0,-2));
      if (currentPixel > 55-this.refs.view.offsetHeight) {
        this.setState({ position: currentPixel-1 });
      } else {
        this.refs.view.classList.remove('active');
      }
    } else {
      var currentPixel = Number(this.refs.view.style.top.slice(0,-2));
      if (currentPixel < 55) {
        this.setState({ position: currentPixel+1 });
      } else {
        this.refs.view.classList.add('active');
      }
    }
  },
  componentWillUpdate: function() {
    if (this.props.triggerManager) {
      setTimeout(this.resolveSetTimeout, 1);
    }
  },
  render: function() {
    var drawer = { top: this.state.position + 'px' };
    return (
      <div ref="view" className="manager-view" style={drawer}>
        <Body onClickPicker={this.props.onClickPicker} />
      </div>
    );
  }
});

module.exports = Manager;
