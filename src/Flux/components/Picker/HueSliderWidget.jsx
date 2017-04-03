var React = require('react');

var HueSliderWidget = React.createClass({
    propTypes: {
        color: React.PropTypes.array.isRequired,
        limit: React.PropTypes.number.isRequired,
        handleChange: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return { x: 0, widgetX: null };
    },
    handleDnD: function(event) {
        var self = this;
        var { handleChange, limit } = this.props;
        var { x, widgetX } = this.state;
        var { widget } = this.refs;

        switch(event.type) {

        case 'mousedown':
            self.setState({ widgetX: event.pageX - widget.offsetLeft });
            document.body.addEventListener('mousemove', self.handleDnD, false);
            break;

        case 'mousemove':
            event.preventDefault();
            var nextX = event.pageX - widgetX;
            if (nextX > x) {
                nextX = nextX > limit ? limit : nextX ;
            } else if (nextX < x) {
                nextX = nextX < 0 ? 0 : nextX;
            }
            handleChange((nextX/limit)*360);
            self.setState({ x: nextX });
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
        var { color, limit } = this.props;
        var max = Math.max(color[0], color[1], color[2]), min = Math.min(color[0], color[1], color[2]);
        var initX = 0;
        if (max !== min) {
            if (max == color[0]) initX = 60 * (color[1] - color[2]) / (max-min);
            if (max == color[1]) initX = 60 * (color[2] - color[0]) / (max-min) + 120;
            if (max == color[2]) initX = 60 * (color[0] - color[1]) / (max-min) + 240;
        }
        initX = initX < 0 ? initX + 360 : initX ;
        this.setState({ x: Math.round((initX/360)*limit) });
    },
    render: function() {
        var { color } = this.props;
        var { x } = this.state;
        var styles = { backgroundColor: 'rgb(' + color.join(',') + ')', left: x + 'px' };
        return (
            <div ref="widget" className="slider-widget" onMouseDown={this.handleDnD} style={styles}></div>
        );
    }
});

module.exports = HueSliderWidget;
