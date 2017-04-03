var React = require('react');
var Rgb = require('./rgb');

var HueSliderWidget = React.createClass({
  propTypes: {
    originColor: React.PropTypes.object.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    limitX: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      X: 0, widgetX: null
    };
  },
  handleDnD: function(event) {
    var self = this;
    switch(event.type) {
      case 'mousedown':
        self.setState({ widgetX: event.pageX - self.refs.widget.offsetLeft });
        document.body.addEventListener('mousemove', self.handleDnD, false);
        break;
      case 'mousemove':
        event.preventDefault();
        var nextX = event.pageX - self.state.widgetX;
        if (nextX > self.state.X) {
          nextX = nextX > self.props.limitX ? self.props.limitX : nextX ;
        } else if (nextX < self.state.X) {
          nextX = nextX < 0 ? 0 : nextX;
        }
        self.props.handleChange(nextX);
        self.setState({ X: nextX });
        document.body.addEventListener('mouseup', self.handleDnD, false);
        document.body.addEventListener('mouseleave', self.handleDnD, false);
        break;
      case 'mouseup':
        document.body.removeEventListener('mousemove', self.handleDnD, false);
        document.body.removeEventListener('mouseup', self.handleDnD, false);
        document.body.removeEventListener("mouseleave", self.handleDnD, false);
        break;
      case 'mouseleave':
        document.body.removeEventListener('mousemove', self.handleDnD, false);
        document.body.removeEventListener('mouseup', self.handleDnD, false);
        document.body.removeEventListener("mouseleave", self.handleDnD, false);
        break;
    }
  },
  componentWillMount: function() {
    var rgb = this.props.originColor.getRgb();
    var max = Math.max(rgb.r, rgb.g, rgb.b);
    var min = Math.min(rgb.r, rgb.g, rgb.b);
    var initialX = 0;
    if (max !== min) {
      if (max == rgb.r) initialX = 60 * (rgb.g - rgb.b) / (max-min);
      if (max == rgb.g) initialX = 60 * (rgb.b - rgb.r) / (max-min) + 120;
      if (max == rgb.b) initialX = 60 * (rgb.r - rgb.g) / (max-min) + 240;
    }
    initialX = initialX < 0 ? initialX + 360 : initialX ;
    this.setState({ X: Math.round((initialX/360)*this.props.limitX) });
  },
  render: function() {
    var rgb = new Rgb();
    rgb.setHsl((this.state.X/this.props.limitX)*360,100,50);
    var style = { backgroundColor: rgb.toString(), left: this.state.X + 'px' };
    return (
      <div ref="widget" className="slider-widget" onMouseDown={this.handleDnD} style={style}></div>
    );
  }
});

module.exports = HueSliderWidget;
