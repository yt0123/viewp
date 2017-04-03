var React = require('react');

var Widget = React.createClass({
  propTypes: {
    handleTarget: React.PropTypes.func.isRequired,
    Color: React.PropTypes.object.isRequired,
    X: React.PropTypes.number.isRequired,
    Y: React.PropTypes.number.isRequired,
    limitX: React.PropTypes.number.isRequired,
    limitY: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      widgetX: null, widgetY: null
    }
  },
  handleDnD: function(event) {
    var self = this;
    switch(event.type) {
      case 'mousedown':
        self.setState({ widgetX: event.pageX - self.refs.widget.offsetLeft, widgetY: event.pageY - self.refs.widget.offsetTop });
        document.body.addEventListener('mousemove', self.handleDnD, false);
        break;
      case 'mousemove':
        event.preventDefault();
        var nextX = event.pageX - self.state.widgetX;
        var nextY = event.pageY - self.state.widgetY;
        if (nextX > self.props.X) {
          nextX = nextX > self.props.limitX ? self.props.limitX : nextX;
        } else if (nextX < self.props.X){
          nextX = nextX < 0 ? 0 : nextX;
        }
        if (nextY > self.props.Y) {
          nextY = nextY > self.props.limitY ? self.props.limitY: nextY;
        } else if (nextY < self.props.Y){
          nextY = nextY < 0 ? 0 : nextY;
        }
        self.props.handleTarget(nextX, nextY);
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
  render: function() {
    var style = { backgroundColor: this.props.Color.toString(), left: this.props.X + 'px', top: this.props.Y + 'px' };
    return (
      <div ref="widget" className="colormap-widget" onMouseDown={this.handleDnD} style={style}></div>
    );
  }
});

module.exports = Widget;
